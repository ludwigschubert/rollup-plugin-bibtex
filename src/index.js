import { createFilter, makeLegalIdentifier, dataToEsm } from "rollup-pluginutils";
import BibtexParser from "bib2json";

const ext = /\.bib(tex|liography)?$/;

export default function bibtex(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    if (!"indent" in options) {
        options.indent = "\t";
    }

    return {
        name: "rollup-plugin-bibtex",

        /* Type: (code: string, id: string) =>
         string |
         null |
         { code: string, map?: string | SourceMap, ast?: ESTree.Program, moduleSideEffects?: boolean | null } */
        /* Kind: async, sequential */
        transform(bibtex, id) {
            if (!ext.test(id)) return null;
            if (!filter(id)) return null;

            const { entries, errors } = BibtexParser(bibtex);
            const entriesByKey = entries.reduce((obj, entry) => {
                obj[entry.EntryKey] = entry;
                return obj;
            }, {});
            return {
                code: dataToEsm(entriesByKey, options),
                map: { mappings: "" },
            };
        },
    };
}
