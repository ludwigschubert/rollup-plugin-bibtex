# rollup-plugin-bibtex

Convert .bibtex files to ES6 modules:

```js
// import a single property from a JSON file,
// discarding the rest
import { adams2019 } from "./bibliography.bib";
console.log( `Author of this paper is ${adams2019.Fields.author}` );

// import the whole file as an object
import bibliography from './bibliography.bibtex';
console.log( bibliography. );
```

This package mereley wraps `bib2json` -- all parsing is done there.

## Installation

_TODO: Not yet published on npm as of 2019-09-11._

```bash
npm install --save-dev rollup-plugin-bibtex
```


## Usage

```js
// rollup.config.js
import bibtex from 'rollup-plugin-bibtex';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },

  plugins: [
    bibtex()
  ]
};
```


## License

MIT
