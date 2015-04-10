var fs = require('fs');
var _ = require('underscore');

var difficulty = process.argv[2];
var sourceFile = 'reverse_words_' + difficulty + '.in';

fs.readFile(sourceFile, 'utf8', function(err, data) {
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
