inlets = 1;
outlets = 3;

var firstIconNames = 10;
var problemNumber = ["0"];

function getRandomNumbers() {
  number = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  digits = number.toString().split("");

  for (var i = 0; i < digits.length - 1; i++) {
    if ((digits[i] >= digits[i + 1]) /*get increasing Number*/ || (digits.indexOf('0') > -1) /*get 0 Number*/ || (digits[0] == digits[i]) && digits[i] == digits[i + 1] /*get repNumber*/ ) {
      post('wrongNumbers' + digits)
    } else {
      correctNumber = digits;
    }
  }


}

function containsZero(digits) {
  for (var i = 0; i < digits.length; i++) {
    if (digits[i] == '0') {
      return true;
    }
  }
}

function containsRepeatedNumbers(digits) {
  targetDigit = digits[0];
  repeatedCount = 1;
  for (var i = 1; i < digits.length; i++) {
    if (digits[i] === targetDigit) {
      post(digits[i], repeatedCount);
      repeatedCount++
    }
  }
  return repeatedCount == digits.length;
}

function test1(i) {
  digits1 = i.toString().split("");
  result = containsRepeatedNumbers(digits1);
  if (result) {
    post("true");
  } else {
    post("false");
  }
}

function test2(i) {
  digits1 = i.toString().split("");
  result = adjacentDigits(digits1);
  if (result) {
    post("true");
  } else {
    post("false");
  }
}

function adjacentDigits(digits) {
  differenceArray = new Array();
  for (var i = 0; i < digits.length - 1; i++) {
    differenceArray.push(digits[i] - digits[i + 1])
  }
  post(digits)
  return ((differenceArray[0] == 1 || differenceArray[0] == -1) && containsRepeatedNumbers(differenceArray))
}

function isDirection() {
  var num = [8, 4, 3];
  var num_direction = num[1] - num[0];
  for (var i = 0; i < num.length - 1; i++) {
    if (num_direction * (num[i + 1] - num[i]) <= 0) {
      post("false");
    }
  }
  post("true");
}