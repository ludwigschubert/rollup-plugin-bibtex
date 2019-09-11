var assert = require("assert");
var rollup = require("rollup");
var bibtex = require("..");
// var npm = require("rollup-plugin-node-resolve");
// var bibtexParser = require("bib2json");

require("source-map-support").install();

process.chdir(__dirname);

describe("rollup-plugin-bibtex", function() {
    it("converts bibtex", function() {
        return rollup
            .rollup({
                input: "samples/main.js",
                plugins: [bibtex()],
            })
            .then(bundle => bundle.generate({ format: "cjs" }))
            .then(generated => {
                const fn = new Function("assert", generated.code);
                fn(assert);
            });
    });

    // it('converts yml', function() {
    // 	return rollup
    // 		.rollup({
    // 			entry: 'samples/yml/main.js',
    // 			plugins: [yaml()]
    // 		})
    // 		.then(executeBundle);
    // });

    // it('generates named exports', function() {
    // 	return rollup
    // 		.rollup({
    // 			entry: 'samples/named/main.js',
    // 			plugins: [yaml()]
    // 		})
    // 		.then(executeBundle);
    // });

    // it('resolves extensionless imports in conjunction with npm plugin', function() {
    // 	return rollup
    // 		.rollup({
    // 			entry: 'samples/extensionless/main.js',
    // 			plugins: [npm({ extensions: ['.js', '.yaml'] }), yaml()]
    // 		})
    // 		.then(executeBundle);
    // });
});
