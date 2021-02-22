import { extractCoauthors } from "./coauthors";

test("should extract coauthors", () => {
  const coauthors = extractCoauthors(`this is a commit body

Co-authored-by: Snake Eyes <s.eyes@gijoe.com>
Co-authored-by: Duke <duke@gijoe.com>
Co-authored-by: Scarlett <scarlett@gijoe.com>
`);
  expect(coauthors).toHaveLength(3);
  expect(coauthors).toEqual([
    {
      name: "Snake Eyes",
      email: "s.eyes@gijoe.com",
    },
    {
      name: "Duke",
      email: "duke@gijoe.com",
    },
    {
      name: "Scarlett",
      email: "scarlett@gijoe.com",
    },
  ]);
});

test("should not find any co-author", () => {
  const coauthors = extractCoauthors(`this is a commit body

this is more stuff.
`);
  expect(coauthors).toHaveLength(0);
});
