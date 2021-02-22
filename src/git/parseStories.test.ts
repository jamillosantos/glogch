import { parseStories } from "./parseStories";

test("should not find any story", () => {
  const stories = parseStories("[c123] content here");
  expect(stories).toHaveLength(0);
});

test("should find a story", () => {
  const stories = parseStories("[ch123] content here");
  expect(stories).toEqual(["123"]);
});

test("should find stories in multiple texts", () => {
  const stories = parseStories("[ch1] content here", "[ch2] content here");
  expect(stories).toEqual(["1", "2"]);
});

test("should not repeat stories", () => {
  const stories = parseStories("[ch1][ch2][ch1][ch3][ch2] content here");
  expect(stories).toEqual(["1", "2", "3"]);
});

test("should not repeat stories in multiple texts", () => {
  const stories = parseStories(
    "[ch1][ch2][ch1][ch3][ch2] content here",
    "[ch3][ch4] second content here"
  );
  expect(stories).toEqual(["1", "2", "3", "4"]);
});
