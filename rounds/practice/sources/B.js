var fs = require('fs');
var _ = require('underscore');

var sourceFile = process.argv[1];
var difficulty = process.argv[2];
var inputFile  = function() {
  x = sourceFile.replace(/sources/, 'input');
  x = x.substr(0, x.length - 3);
  return x + '-' + difficulty + '.in';
}();

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  content = data.split('\n');

  var numberOfCases = content[0];

  content.pop();
  content.shift();

  _.map(content, function(line, key) {
    result = line.split(' ')
      .reverse()
      .join(' ');
    console.log('Case #' + (key + 1) + ': ' + result);
  });
});
