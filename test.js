var spectrum = require('csv-spectrum')
var test = require('tape')
var detect = require('./')

test('detect csvs from csv-spectrum (and reject jsons)', function (t) {
  spectrum(function (err, data) {
    if (err) throw err
    data.forEach(function (datum) {
      t.ok(detect(datum.csv), 'csv ' + datum.name)
      t.notOk(detect(datum.json), 'json ' + datum.name)
    })
    t.end()
  })
})

test('detect delimiters', function (t) {
  var d
  d = detect('a,b,c\n1,2,3') || {}
  t.equals(d.delimiter, ',', ',')

  d = detect('a;b;c\n\r1;2;3') || {}
  t.equals(d.delimiter, ';', ';')

  d = detect('"a,,,,,,,,,"\tb\tc\n1\t2\t3') || {}
  t.equals(d.delimiter, '\t', '\\t and quotes')

  t.end()
})

test('detect newlines', function (t) {
  var d
  d = detect('a,b,c\n1,2,3\n') || {}
  t.equals(d.newline, '\n', '\\n')

  d = detect('a,b,c\r1,2,3\r') || {}
  t.equals(d.newline, '\r', '\\r')

  t.end()
})

test('one column with quotes', function (t) {
  var d
  d = detect('"hello"\n"test"') || {}
  t.equals(d.newline, '\n', 'newline')
  t.notOk(d.delimiter, 'unknown delimiter') // ~false or null

  d = detect('"hello ""you"""\n"hi"') || {}
  t.equals(d.newline, '\n', 'newline')
  t.notOk(d.delimiter, 'unknown delimiter') // ~false or null

  d = detect('hello\nhello')
  t.notOk(d, 'not quoted')

  d = detect('"hello""\n"hello""')
  t.notOk(d, 'wrong quotes')

  t.end()
})

//  should this considered be valid csv? {"a": 1, "b": 2, "c": 3}\n{"a": 1, "b": 2, "c": 3}
// it's like ['{"a": 1', '"b": 2' ... ]

// test('reject ndjson', function (t) {
//   var d
//   d = detect('{"a": 1, "b": 2, "c": 3}\n{"a": 1, "b": 2, "c": 3}')
//   t.notOk(d)
//   t.end()
// })
