var assert = require("assert");
var rollup = require("rollup");
var bibtex = require("..");
// var npm = require("rollup-plugin-node-resolve");
// var bibtexParser = require("bib2json");

require("source-map-support").install();

process.chdir(__dirname);

describe("rollup-plugin-bibtex", () => {
    it("converts bibtex", () => {
        return rollup
            .rollup({
                input: "samples/simple/main.js",
                plugins: [bibtex()],
            })
            .then(bundle => bundle.generate({ format: "cjs" }))
            .then(generated => {
                // rollup@1.0/0.6x compatibility
                const code = generated.output
                    ? generated.output[0].code
                    : generated.code;
                const fn = new Function("assert", code);
                fn(assert);
            });
    });

    it("generates named exports", () => {
        return rollup
            .rollup({
                input: "samples/named/main.js",
                plugins: [bibtex()],
            })
            .then(bundle => bundle.generate({ format: "cjs" }))
            .then(generated => {
                // rollup@1.0/0.6x compatibility
                const code = generated.output
                    ? generated.output[0].code
                    : generated.code;
                const exports = {};
                const fn = new Function("exports", code);
                fn(exports);

                assert(exports.adams2019);
                assert.equal(
                    code.indexOf("adams2018"),
                    -1,
                    "should exclude unused properties"
                );
            });
    });

    it("resolves common extensions", () => {
        return rollup
            .rollup({
                input: "samples/extensions/main.js",
                plugins: [bibtex()],
            })
            .then(bundle => bundle.generate({ format: "cjs" }))
            .then(generated => {
                // rollup@1.0/0.6x compatibility
                const code = generated.output
                    ? generated.output[0].code
                    : generated.code;
                const exports = {};
                const fn = new Function("exports", code);
                fn(exports);

                assert(exports.bib);
                assert(exports.bibtex);
                assert(exports.bibliography);
            });
    });

    it("parses lots of real-world bibtex entries", () => {
        return rollup
            .rollup({
                input: "samples/real-world/main.js",
                plugins: [bibtex()],
            })
            .then(bundle => bundle.generate({ format: "cjs" }))
            .then(generated => {
                // rollup@1.0/0.6x compatibility
                const code = generated.output
                    ? generated.output[0].code
                    : generated.code;
                const exports = {};
                const fn = new Function("exports", code);
                fn(exports);

                const exampleAuthor = /Hinton, Geoffrey E\.$/;

                assert(exports.taylor);
                assert(exampleAuthor.test(exports.taylor.Fields.author));
            });
    });
});
