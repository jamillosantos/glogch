"use strict";
exports.__esModule = true;
exports.parseStories = void 0;
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
function parseStories() {
    var texts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        texts[_i] = arguments[_i];
    }
    var stories = [];
    var storiesMap = {};
    var m;
    for (var _a = 0, texts_1 = texts; _a < texts_1.length; _a++) {
        var text = texts_1[_a];
        var storyRegex = /\[ch([0-9]+)\]/g;
        do {
            m = storyRegex.exec(text);
            if (!m)
                break;
            if (storiesMap[m[1]])
                continue; // Ensure stories uniqueness
            stories.push(m[1]);
            storiesMap[m[1]] = true;
        } while (true);
    }
    return stories;
}
exports.parseStories = parseStories;
