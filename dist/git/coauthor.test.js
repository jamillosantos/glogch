"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coauthors_1 = require("./coauthors");
test("should extract coauthors", function () {
    var coauthors = coauthors_1.extractCoauthors("this is a commit body\n\nCo-authored-by: Snake Eyes <s.eyes@gijoe.com>\nCo-authored-by: Duke <duke@gijoe.com>\nCo-authored-by: Scarlett <scarlett@gijoe.com>\n");
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
test("should not find any co-author", function () {
    var coauthors = coauthors_1.extractCoauthors("this is a commit body\n\nthis is more stuff.\n");
    expect(coauthors).toHaveLength(0);
});
//# sourceMappingURL=coauthor.test.js.map