# sci-birch

The tree CLI on NodeJS using the [Small Clojure Interpreter](https://github.com/borkdude/sci). Ported from [lambdaisland](https://github.com/lambdaisland)'s [birch](https://github.com/lambdaisland/birch).

## Why this port?

I wanted to examine the usability of [sci](https://github.com/borkdude/sci) on NodeJS.

## Install

First clone this repo. Then run `npm install`.

## Run

    node main.js [ <path> ]

Example:

``` shellsession
$ node main.js node_modules
node_modules
└── @borkdude
    └── sci
        ├── README.md
        ├── package.json
        └── sci.js
```

## License

Copyright © 2019 Michiel Borkent

Distributed under the Eclipse Public License 1.0.
