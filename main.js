// This code is based on this project: https://github.com/lambdaisland/birch

const { evalString, toJS } = require('@borkdude/sci');
const fs = require('fs');
const { readdirSync, statSync } = fs;
const { join } = require('path');

process.on('uncaughtException', console.error);

// we're creating a environment, so sci will remember evaluations over multiple
// calls to evalString:
const env = evalString("(atom)");

const sciOptions = {
  namespaces: {
    "node.interop": {
      "read-dir": readdirSync,
      "path-join": join,
      "directory?": function(f) { return statSync(f).isDirectory(); },
      "print": console.log
    }
  },
  env: env
};

// read the Clojure script from disk
const script = fs.readFileSync('script.cljs').toString();

// evaluate the script:
evalString(script, sciOptions);

// let's retrieve the main function and make it callable from JS:
const main = toJS(evalString("user/main", sciOptions));

// execute!
main(process.argv);
