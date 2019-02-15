"use strict";
var sort = require("../Practice2/sortPractice");
var search = require("../Practice1/searchPractice");
function generate(testLengthArray) {
  var i, j;
  var target, special;
  var allDataTest = new Array(testLengthArray.length);

  for (i = 0; i < testLengthArray.length; i++) {
    var dataTest = new Array(testLengthArray[i]);
    for (j = 0; j < testLengthArray[i]; j++) {
      dataTest[j] = Math.floor(Math.random() * 20000 - 9999);
    }
    sort(dataTest);
    special = Math.floor(Math.random() * 4 + 1);
    switch (special) {
      case 1:
        target = Math.floor(Math.random() * 20000 - 9999);
        while(testLengthArray.indexOf(target)!==-1){
          target = Math.floor(Math.random() * 20000 - 9999);
        }
        break;
      case 2:
        target = dataTest[0];
        break;
      case 3:
        target = dataTest[testLengthArray[i] - 1];
        break;
      case 4:
        target =
          dataTest[Math.floor(Math.random() * (testLengthArray[i] - 2) + 1)];
        break;
    }

    allDataTest[i] = {
      input: dataTest,
      target: target,
      output: search(dataTest, target)
    };
  }

  return allDataTest;

  // Remove this line and change to your own algorithm
}
console.log(generate([17, 2, 3, 4]));
module.exports = generate;
