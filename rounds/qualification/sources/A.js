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

  _.each(content, function(line, key) {
    var line = line.split(' ');
    var maxShy = line[0];

    var numberOfNeededFriends = 0;
    var numberOfStoodupPersons = 0;

    _.each(line[1], function(numberOfPersons, shynessLevel) {
      if (numberOfPersons > 0) {

      var willSU = willStandUp(shynessLevel, numberOfStoodupPersons);

        if (willSU && typeof(willSU) != 'number') {
          numberOfStoodupPersons += parseInt(numberOfPersons);
        } else {
          numberOfNeededFriends += parseInt(willSU);
          numberOfStoodupPersons += parseInt(numberOfPersons) + parseInt(willSU);
        }
      }
    });
    console.log('Case #' + (key + 1) + ': ' + numberOfNeededFriends);
  });

});

function willStandUp(shynessLevel, numberOfStoodUpPersons) {
  if (shynessLevel > numberOfStoodUpPersons) {
    return shynessLevel - numberOfStoodUpPersons;
  } else {
    return true;
  }
}
