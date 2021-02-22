import _ from "colors";
import fs from "fs";
import path from "path";
import yargs from "yargs";
import { Spinner } from "clui";
import { Presets, SingleBar } from "cli-progress";

import Workspace, { Story } from "../../clubhouse/workspace";
import { Commit, gitLog } from "../../git/log";
import * as time from "../../time";
import { extractCoauthors } from "../../git/coauthors";

import { format } from "util";

const printf = (f: string, ...args: any) => {
  process.stdout.write(format(f, ...args));
};

const println = (content?: string) => {
  if (content) process.stdout.write(content);
  process.stdout.write("\n");
};

interface Args {
  token?: string;
  repo?: string;
  revisionRange?: string;
  includeMergeCommits: boolean;
  ignoreStories: boolean;
}

type RenderElement =
  | Story
  | Commit
  | RenderGroup
  | ((ctx: RenderContext) => void);

interface RenderGroup {
  title: string;
  render: RenderElement[];
}

interface ObjectRenderer {
  workspace: Workspace;
  stories: Story[];
  commits: Commit[];
  groups: RenderGroup[];
}

const progressBarFormat = (title: string) => `${title} [{bar}] {percentage}%`;

interface RenderContext {
  workspace: Workspace;
  level: number;
  ignoreStories?: boolean;
}

const renderStoryResponsibles = async (workspace: Workspace, story: Story) => {
  if (story.owner_ids.length === 0) {
    printf("Sem responsável");
  } else {
    const owners = (
      await Promise.all(
        story.owner_ids.map(async (id) => {
          try {
            return await workspace.getMember(id);
          } catch (e) {
            return null;
          }
        })
      )
    ).filter((owner) => owner !== null);

    owners.forEach((owner, idx) => {
      if (idx > 0 && idx < owners.length - 1) {
        printf(", ");
      } else if (idx > 0) {
        printf(" and ");
      }
      printf("%s", owner?.profile.name);
    });
  }
};

const render = async (el: RenderElement, ctx: RenderContext) => {
  const { workspace } = ctx;

  if (typeof el == "function") {
    return el({
      ...ctx,
      level: ctx.level + 1,
    });
  }

  if ((el as Story).id && (el as Story).app_url) {
    const story = el as Story;
    printf("* [[ch%s]](%s) %s", story.id, story.app_url, story.name);
    printf(" (");
    await renderStoryResponsibles(workspace, story);
    println(")");
    if (!story.render) return;
    for (const linkedStory of story.render) {
      printf(
        "  * [[ch%s]](%s) %s (",
        linkedStory.id,
        linkedStory.app_url,
        linkedStory.name
      );
      await renderStoryResponsibles(workspace, linkedStory);
      println(")");
    }
    return;
  }

  if ((el as Commit).hash) {
    const commit = el as Commit;

    let subject = commit.subject;

    if (!ctx.ignoreStories) {
      const stories = (
        await Promise.all(
          commit.stories.map(async (storyId) => {
            try {
              return await workspace.getStory(storyId);
            } catch (e) {
              return null;
            }
          })
        )
      ).filter((story) => story !== null);

      subject = (() => {
        // Add link to story tags.
        let subject = commit.subject;
        stories.forEach((story) => {
          if (story)
            subject = subject.replace(
              `[ch${story.id}]`,
              `[[ch${story.id}]](${story.app_url})`
            );
        });
        return subject;
      })();
    }

    printf("* %s %s (%s", commit.hash, subject, commit.authorName);

    const coauthors = extractCoauthors(commit.body);
    if (coauthors) {
      coauthors.forEach((coauthor, idx) => {
        if (idx < coauthors.length - 1) {
          printf(", ");
        } else {
          printf(" and ");
        }
        printf("%s", coauthor.name);
      });
    }
    printf(")");

    if (!commit.stories || commit.stories.length == 0) {
      println();
      return;
    }

    const labels = [];
    for (const storyId of commit.stories) {
      try {
        const story = await workspace.getStory(storyId);
        for (const label of story.labels) {
          labels.push(label.name);
        }
      } catch (e) {}
    }
    if (labels.length > 0) {
      printf(" [%s]", labels.join(","));
    }

    println();
    return;
  }

  if ((el as RenderGroup).render) {
    const group = el as RenderGroup;
    printf("%s %s", "#".repeat(ctx.level), group.title);
    println();
    println();
    for (const elToRender of group.render) {
      await render(elToRender, {
        ...ctx,
        level: ctx.level + 1,
      });
    }
    println();
  }
};

type RenderFunc = typeof render;

interface ExternalScript {
  default: {
    classify: (obj: ObjectRenderer) => RenderGroup[];
    render: (render: RenderFunc) => RenderFunc;
  };
}

function rootCommand(yargs: yargs.Argv) {
  return yargs.command<Args>(
    "$0 <revisionRange>",
    "",
    (yargs) => {
      yargs.option("token", {
        alias: "t",
        type: "string",

        describe: "Clubhouse API Token",
      });

      yargs.option("repo", {
        alias: "r",
        type: "string",
        default: ".",
        describe: "The repository folder for extracting the git log",
      });

      yargs.option("include-merge-commits", {
        alias: "m",
        type: "boolean",
        default: false,
        describe: "When enabled, the merge commits will be listed",
      });

      yargs.option("ignore-stories", {
        alias: "s",
        type: "boolean",
        default: false,
        describe: "When enabled, do not get any story information",
      });

      yargs.positional("revisionRange", {
        type: "string",
        describe: "revision range (ex: v2.6.1..HEAD)",
      });
    },
    async (argv) => {
      if (!argv.token && fs.existsSync(".glogch.json")) {
        try {
          const fileContent = fs.readFileSync(".glogch.json");
          const data = JSON.parse(fileContent.toString());
          argv.token = data.token;
        } catch (e) {
          console.error("error loading .glogch.json:", e);
          process.exit(1);
        }
      }

      const workspace = new Workspace(argv.token!);

      /*************************************************************************
       * Commits
       */

      var spinnerGettingLog = new Spinner("Retrieving git log...  ", [
        "⣾",
        "⣽",
        "⣻",
        "⢿",
        "⡿",
        "⣟",
        "⣯",
        "⣷",
      ]);
      spinnerGettingLog.start();

      let commits: Commit[];

      const stories: { [propName: string]: boolean } = {};
      const relatedStories: { [propName: string]: boolean } = {};
      const members: { [propName: string]: boolean } = {};
      const epics: { [propName: string]: boolean } = {};
      const projects: { [propName: string]: boolean } = {};

      try {
        await time.sleep(250);

        commits = (
          await gitLog({
            revisionRange: argv.revisionRange!,
            repo: argv.repo!,
          })
        ).filter((commit) => argv.includeMergeCommits || !commit.isMerge);

        await time.sleep(250);

        spinnerGettingLog.message("👍 Done getting git log");

        await time.sleep(250);
        spinnerGettingLog.stop();
      } catch (e) {
        spinnerGettingLog.stop();
        console.error("error listing the commits: ", e);
        process.exit(1);
      }

      if (!argv.ignoreStories) {
        /*************************************************************************
         * Stories
         */

        // Collect stories from all commits.
        commits.forEach((commit) => {
          commit.stories.forEach((id) => (stories[id] = true));
        });

        const pb = new SingleBar(
          {
            stream: process.stderr,
            format: progressBarFormat("Fetching stories"),
          },
          Presets.legacy
        );
        try {
          pb.start(Object.keys(stories).length, 0);

          for (const storyId in stories) {
            try {
              const story = await workspace.getStory(storyId);
              if (story.epic_id) epics[story.epic_id] = true;
              story.owner_ids.forEach((id) => (members[id] = true));
              story.story_links.forEach((storyLink) => {
                relatedStories[storyLink.object_id] = true;
              });
              projects[story.project_id] = true;
            } catch (e) {
              switch (e?.response?.status) {
                case 401:
                  pb.stop();
                  console.error(
                    `${
                      "ERROR:".red
                    } Cloud not fetch the story from Clubhouse: invalid token`
                  );
                  process.exit(1);
                  break;
                case 404:
                  console.error();
                  console.error(
                    `${"WARNING:".yellow} Story ${storyId} was not found.`
                  );
                  break;
                default:
                  console.log(`error getting story ${storyId}:`, e);
              }
            } finally {
              pb.increment();
            }
          }

          /*************************************************************************
           * Related Stories
           */
          pb.start(Object.keys(relatedStories).length, 0, {});
          (pb as any).options.format = progressBarFormat(
            "Fetching related stories"
          );

          for (const storyId in relatedStories) {
            try {
              const story = await workspace.getStory(storyId);
              if (story.epic_id) epics[story.epic_id] = true;
              story.owner_ids.forEach((id) => (members[id] = true));
              projects[story.project_id] = true;
            } catch (e) {
              switch (e?.response?.status) {
                case 401:
                  pb.stop();
                  console.error(
                    `${
                      "ERROR:".red
                    } Cloud not fetch the story from Clubhouse: invalid token`
                  );
                  process.exit(1);
                  break;
                case 404:
                  console.error();
                  console.error(
                    `${"WARNING:".yellow} Story ${storyId} was not found.`
                  );
                  break;
                default:
                  console.log(`error getting story ${storyId}:`, e);
              }
            } finally {
              pb.increment();
            }
          }

          /*************************************************************************
           * Members
           */
          pb.start(Object.keys(members).length, 0, {});
          (pb as any).options.format = progressBarFormat("Fetching members");

          for (const memberId in members) {
            try {
              await workspace.getMember(memberId);
            } catch (e) {
              switch (e?.response?.status) {
                case 401:
                  pb.stop();
                  console.error(
                    `${
                      "ERROR:".red
                    } Cloud not fetch the member from Clubhouse: invalid token`
                  );
                  process.exit(1);
                  break;
                case 404:
                  console.error();
                  console.error(
                    `${"WARNING:".yellow} Member ${memberId} was not found.`
                  );
                  break;
                default:
                  console.log(`error getting member ${memberId}:`, e);
              }
            } finally {
              pb.increment();
            }
          }

          /*************************************************************************
           * Epics
           */
          pb.start(Object.keys(epics).length, 0, {});
          (pb as any).options.format = progressBarFormat("Fetching epics");

          for (const epicId in epics) {
            try {
              const epic = await workspace.getEpic(epicId);
              epic.project_ids.forEach(
                (projectId) => (projects[projectId] = true)
              );
            } catch (e) {
              switch (e?.response?.status) {
                case 401:
                  pb.stop();
                  console.error(
                    `${
                      "ERROR:".red
                    } Cloud not fetch the member from Clubhouse: invalid token`
                  );
                  process.exit(1);
                  break;
                case 404:
                  console.error();
                  console.error(
                    `${"WARNING:".yellow} Member ${epicId} was not found.`
                  );
                  break;
                default:
                  console.log(`error getting member ${epicId}:`, e);
              }
            } finally {
              pb.increment();
            }
          }

          /*************************************************************************
           * Projects
           */
          pb.start(Object.keys(projects).length, 0, {});
          (pb as any).options.format = progressBarFormat("Fetching projects");

          for (const projectId in projects) {
            try {
              await workspace.getProject(projectId);
            } catch (e) {
              switch (e?.response?.status) {
                case 401:
                  pb.stop();
                  console.error(
                    `${
                      "ERROR:".red
                    } Cloud not fetch the project from Clubhouse: invalid token`
                  );
                  process.exit(1);
                  break;
                case 404:
                  console.error();
                  console.error(
                    `${"WARNING:".yellow} Project ${projectId} was not found.`
                  );
                  break;
                default:
                  console.log(`error getting project ${projectId}:`, e);
              }
            } finally {
              pb.increment();
            }
          }
        } finally {
          pb.stop();
        }
      }

      const obj: ObjectRenderer = {
        workspace,
        commits,
        stories: (
          await Promise.all(
            Object.keys(stories).map(async (storyId) => {
              try {
                return await workspace.getStory(storyId);
              } catch (e) {
                return null;
              }
            })
          )
        ).filter((story) => story !== null) as Story[],
        groups: [],
      };

      let renderGroup = render;
      const scriptFileName = path.join(process.cwd(), ".glogch.js");

      if (fs.existsSync(scriptFileName)) {
        const es = require(scriptFileName) as ExternalScript;
        if (es.default.render) renderGroup = await es.default.render(render);
        if (es.default.classify) obj.groups = await es.default.classify(obj);
      }

      if (!obj.groups?.length) {
        obj.groups = [];
        if (!argv.ignoreStories) {
          obj.groups.push({
            title: "Stories",
            render: obj.stories,
          });
        }
        obj.groups.push({
          title: "Commits",
          render: obj.commits,
        });
      }

      for (const group of obj.groups) {
        await renderGroup(group, {
          workspace,
          level: 1,
          ignoreStories: argv.ignoreStories,
        });
      }

      return argv;
    }
  );
}

export default rootCommand;
