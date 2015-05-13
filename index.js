
module.exports = function detectCSV(chunk, opts) {
  opts = opts || {}
  if(Buffer.isBuffer(chunk)) chunk = chunk + ''
  var delimiters = opts.delimiters || [',', ';', '\t', '|']
  var newlines = opts.newlines || ['\n', '\r']
  
  var lines = chunk.split(/[\n\r]+/g)
  
  var delimiter = determineMost(lines[0], delimiters)
  var newline = determineMost(chunk, newlines)
  
  if (!delimiter) {
    if (chunk.match(/[{}]/g)) return null
    delimiter = ','
  }

  return {
    delimiter: delimiter,
    newline: newline
  }
}

function determineMost(chunk, items) {
  var ignoreString = false
  var itemCount = {}
  var maxValue = 0
  var maxChar
  var currValue
  items.forEach(function (item) {
    itemCount[item] = 0
  })
  for(var i = 0; i < chunk.length; i++) {
    if(chunk[i] === '"') ignoreString = !ignoreString
    else if(!ignoreString && chunk[i] in itemCount) {
      currValue = ++itemCount[chunk[i]]
      if(currValue > maxValue) {
        maxValue = currValue
        maxChar = chunk[i]
      }
    }
  }
  return maxChar
}
