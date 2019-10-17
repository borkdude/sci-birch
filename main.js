// This code is based on this project: https://github.com/lambdaisland/birch

const { evalString } = require('@borkdude/sci');
const fs = require('fs');
const { readdirSync, statSync } = fs;
const { join } = require('path');

process.on('uncaughtException', console.error);

const sciOptions = {
  namespaces: {
    "node.interop": {
      "read-dir": readdirSync,
      "path-join": join,
      "directory?": function(f) { return statSync(f).isDirectory(); },
      "print": console.log
    }
  }
};

// read the Clojure script from disk
const script = fs.readFileSync('script.cljs').toString();

// evalString returns a CLJS function which we convert to a JS function
const main = (evalString(script, sciOptions));

// execute!
main(process.argv);
