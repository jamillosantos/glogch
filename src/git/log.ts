import { ID } from "clubhouse-lib";
import { gitlogPromise } from "gitlog";
import { format } from "node:path";
import { extractCoauthors, Person } from "./coauthors";
import { parseStories } from "./parseStories";

interface GitLogOpts {
  /**
   * The revision range that will be passed to the `gitlog` library.
   */
  revisionRange: string;

  /**
   * The path of the repository.
   */
  repo: string;

  /**
   * List all commits.
   */
  all: boolean;
}

// Fields represent the fields that a `gitlog` will return.
type Fields =
  | "hash"
  | "parentHashes"
  | "subject"
  | "body"
  | "authorName"
  | "authorEmail"
  | "committerName"
  | "committerEmail";

export interface Commit extends Record<Fields, string> {
  coauthors?: Person[];
  stories: ID[];
  isMerge: boolean;
}

/**
 * gitLog list commits using `gitlog` library based on the `revisionRange` passed.
 *
 * @param opts
 */
export const gitLog = async ({
  revisionRange,
  repo = ".",
  all,
}: GitLogOpts) => {
  const commits = await gitlogPromise<Fields>({
    branch: revisionRange,
    number: 1000000,
    all,
    repo: repo,
    fields: [
      "hash",
      "parentHashes",
      "subject",
      "body",
      "authorName",
      "authorEmail",
      "committerName",
      "committerEmail",
    ],
  });
  return commits.map<Commit>((commit) => {
    return {
      ...commit,
      coautors: extractCoauthors(commit.body),
      stories: parseStories(commit.subject, commit.body),
      isMerge: commit.parentHashes.indexOf(" ") > -1, // If there is more than one parent.
    };
  });
};
