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


  // console.log(content);

  for (var i = 0 ; i < content.length ; i+= 2) {
    var diners = content[i];
    var pancakes = content[i+1].split(' ');
    var maxValue = _.max(pancakes);

    // console.log(_.countBy(pancakes)[maxValue]);

    console.log(maxValue);

    // console.log('Case #' + (i/2 + 1) + ': ');
  }

});

// expectations
// Case #1: 3
// Case #2: 2
// Case #3: 3

function calculateGain(list, element) {
  var maxValue = _.max(list);
  var maxValueCount = _.countBy(list)[maxValue];
  var futureMaxValue = function() {
    for (var i = 0 ; i< maxValueCount ; i++) {
      list.splice(list.indexOf(element), 1);
    }
    return _.max(list);
  }();




//   console.log(maxValue)
//   console.log(maxValueCount)
//   console.log(futureMaxValue)


//   var cost;
//   var gain;

//   return (gain - cost);
}
calculateGain([1, 2, 3, 50], 50);
calculateGain([1, 12, 3, 4, 12], 12);



function calculateOptimalTime(numberofPancakes) {
  var closestSqrt = Math.floor(Math.sqrt(numberofPancakes));
  var leftOver = numberofPancakes - Math.pow(closestSqrt, 2);
  var rest = Math.ceil(leftOver / closestSqrt);
  return closestSqrt * 2 - 1 + rest;
}

console.log(calculateOptimalTime(31));
