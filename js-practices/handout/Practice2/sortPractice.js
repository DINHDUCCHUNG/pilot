"use strict";

function sort(input) {
  var i, j, temp;
  for (i = 0; i < input.length; i++) {
    for (j = i + 1; j < input.length; j++) {
      if (input[i] > input[j]) {
        temp = input[i];
        input[i] = input[j];
        input[j] = temp;
      }
    }
  }
  return input;
}

module.exports = sort;
