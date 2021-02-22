import { ID } from "clubhouse-lib";

/**
 * parseStories receives `texts` and tries to find Clubhouse stories.
 *
 * At the Clubhouse, whenever you want to link a story you can tag it by using
 * `[ch<story id>]`. This pattern is what this function tries to extract.
 *
 * This function will report each story found once. Even if it appears many times
 * on the text.
 *
 * @param texts The source of the texts where this method will try finding clubhouse story tags.
 */
export function parseStories(...texts: string[]): ID[] {
  let stories: string[] = [];
  let storiesMap: { [propName: string]: boolean } = {};
  let m: any;
  for (const text of texts) {
    const storyRegex = /\[ch([0-9]+)\]/g;
    do {
      m = storyRegex.exec(text);
      if (!m) break;

      if (storiesMap[m[1]]) continue; // Ensure stories uniqueness

      stories.push(m[1]);
      storiesMap[m[1]] = true;
    } while (true);
  }

  return stories;
}
