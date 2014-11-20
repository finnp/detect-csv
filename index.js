
module.exports = function detectCSV(chunk, opts) {
  opts = opts || {}
  if(Buffer.isBuffer(chunk)) chunk = chunk + ''
  var delimiters = opts.delimiters || [',', ';', '\t', '|']
  
  var lines = chunk.split(/[\n\r]+/g)
  
  var delimiter = determineDelimiter(lines[0], delimiters)
  
  if(delimiter) {
    return {delimiter: delimiter}
  } 
  return null
}

function determineDelimiter(line, delimiters) {
  var ignoreString = false
  var delimCount = {}
  var maxValue = 0
  var maxChar
  var currValue
  delimiters.forEach(function (delimiter) {
    delimCount[delimiter] = 0
  })
  for(var i = 0; i < line.length; i++) {
    if(line[i] === '"') ignoreString = !ignoreString
    else if(!ignoreString && line[i] in delimCount) {
      currValue = ++delimCount[line[i]]
      if(currValue > maxValue) {
        maxValue = currValue
        maxChar = line[i]
      }
    }
  }
  return maxChar
}