/**
 * Person represents a co-author.
 */
export interface Person {
  name: string;
  email: string;
}

/**
 * extractCoauthors finds a string by the git co-authors format (Co-authored-by: NAME <EMAIL>).
 *
 * @param body String where the methods will try fiding the co-authors.
 */
export const extractCoauthors = (body: string): Person[] | undefined => {
  const coauthorRegexp = /Co-authored-by: (.+) <([^>]+)>/g;

  const coauthors: Person[] = [];
  let match: any;
  let i = 0;
  do {
    match = coauthorRegexp.exec(body);
    if (match)
      coauthors.push({
        name: match[1],
        email: match[2],
      });
  } while (match);
  return coauthors;
};
