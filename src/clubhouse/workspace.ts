import ch, {
  Epic,
  ID,
  Member,
  Project,
  Story as StoryCH,
  StoryLink,
} from "clubhouse-lib";

export interface Story extends StoryCH {
  story_links: StoryLink[];
  render?: Story[];
}

class Workspace {
  private client: ch<RequestInfo, Response>;

  private members: {
    [memberId: string]: Member;
  } = {};

  private membersErr: {
    [memberId: string]: Error;
  } = {};

  private projects: {
    [projectId: string]: Project;
  } = {};

  private projectsErr: {
    [projectId: string]: Error;
  } = {};

  private stories: {
    [storyId: string]: Story;
  } = {};

  private storiesErr: {
    [storyId: string]: Error;
  } = {};

  private epics: {
    [epicId: string]: Epic;
  } = {};

  private epicsErr: {
    [epicId: string]: Error;
  } = {};

  constructor(token: string) {
    this.client = ch.create(token);
  }

  async getMember(id: ID) {
    const member = this.members[id];
    if (member) {
      return member;
    }

    const memberErr = this.membersErr[id];
    if (memberErr) throw memberErr;

    try {
      const member = await this.client.getMember(id);
      this.members[id] = member;
      return member;
    } catch (e) {
      this.membersErr[id] = e;
      throw e;
    }
  }

  async getProject(id: ID) {
    const project = this.projects[id];
    if (project) return project;
    try {
      const project = await this.client.getProject(id);
      delete this.projectsErr[id];
      this.projects[id] = project;
      return project;
    } catch (e) {
      this.projectsErr[id] = e;
      throw e;
    }
  }

  async getStory(id: ID) {
    const story = this.stories[id];
    if (story) {
      return story;
    }
    const storyErr = this.storiesErr[id];
    if (storyErr) {
      throw storyErr;
    }
    try {
      const story = (await this.client.getStory(id)) as Story;
      this.stories[id] = story as Story;
      delete this.storiesErr[id];
      return story;
    } catch (e) {
      this.storiesErr[id] = e;
      throw e;
    }
  }

  async getEpic(id: ID) {
    const epic = this.epics[id];
    if (epic) {
      return epic;
    }
    try {
      const epic = await this.client.getEpic(id);
      this.epics[id] = epic;
      return epic;
    } catch (e) {
      this.epicsErr[id] = e;
      throw e;
    }
  }
}

export default Workspace;
