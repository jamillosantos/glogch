"use strict";
exports.__esModule = true;
exports.extractCoauthors = void 0;
/**
 * extractCoauthors finds a string by the git co-authors format (Co-authored-by: NAME <EMAIL>).
 *
 * @param body String where the methods will try fiding the co-authors.
 */
var extractCoauthors = function (body) {
    var coauthorRegexp = /Co-authored-by: (.+) <([^>]+)>/g;
    var coauthors = [];
    var match;
    var i = 0;
    do {
        match = coauthorRegexp.exec(body);
        if (match)
            coauthors.push({
                name: match[1],
                email: match[2]
            });
    } while (match);
    return coauthors;
};
exports.extractCoauthors = extractCoauthors;
