# detect-csv
Windows | Mac/Linux
------- | ---------
[![Windows Build status](http://img.shields.io/appveyor/ci/finnp/detect-csv.svg)](https://ci.appveyor.com/project/finnp/detect-csv/branch/master) | [![Build Status](https://travis-ci.org/finnp/detect-csv.svg?branch=master)](https://travis-ci.org/finnp/detect-csv)

Detect if a chunk in the beginning of a CSV (in the sense of character seperated values)
is valid and determine the delimiter character. Install with `npm install detect-csv`.

Right now it only parses the first line and counts characters.
So the rest of the CSV might be invalid. Also I recommend checking for json/ndjson first,
since it's the more strict format.

```js
var detect = require('detect-csv')

var csv = detect('a,b,c\n1,2,3')

console.log(csv.delimiter)
console.log(csv.newline)
// prints ',' and '\n'

var isCsv = detect('notacsv')
console.log('This is ' + (isCsv ? '' : 'not') + ' a csv') 
// prints: This is not a csv
```

You add the following options as a second parameter:
* *delimiters* Delimiters to detect, defaults to `[',', ';', '\t', '|']`.
* *newlines* Newline characters to detect, defaults to `['\n', '\r']`.

Delimiters and newlines don't work with multiple characters, e.g. `\r\n`.
