"use strict";

function search(input, target) {
  var i, index;
  var cat = [-1];
  index = 0;
  for (i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  return -1;
}

module.exports = search;
