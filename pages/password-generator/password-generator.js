$("#errorMessage").hide();

function showError(message) {
  $("#errorMessage").show().append("<p>" + message + "</p>");
}

function generate(numberToGenerate,
  generateLength,
  generateWithSymbols,
  generateWithNumbers,
  generateWithLowerCaseLetters,
  generateWithUpperCaseLetters,
  generateWithoutAmbigousCharaters) {
  var charset = "";
  if (generateWithSymbols) {
    charset += "`~!@#$%^&*()_+-=[]\;',./{}|:\"<>?";
  }
  if (generateWithNumbers) {
    charset += "1234567890";
  }
  if (generateWithLowerCaseLetters) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }
  if (generateWithUpperCaseLetters) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (generateWithoutAmbigousCharaters) {
    charset = charset.replace(/[il1oO0{}()\[\].:;<>'"`~]/g, "");
  }

  var rval = "";
  for (var i = 0; i < numberToGenerate; i++) {
    rval += generatePassword(generateLength, charset) + "\n";
  }
  return rval;
}

function generatePassword(length, charset) {
  var rval = "";
  var n = charset.length;
  for (var i = 0; i < length; i++) {
    rval += charset.charAt(Math.floor(Math.random() * n));
  }
  return rval;
}

$("form").submit(function (event) {
  event.preventDefault();
  $("#errorMessage").hide();
  $("#errorMessage").empty();

  var numberToGenerateRaw = $("#numberToGenerate").val();
  var numberToGenerate = Number(numberToGenerateRaw);
  if (numberToGenerate > 100) {
    showError("WARNING: This generator will not generate more than 100 passwords as it takes too long in the browser.");
  }

  var generateLengthRaw = $("#generateLength").val();
  var generateLength = Number(generateLengthRaw);
  if (generateLength > 100) {
    showError("WARNING: This generator will generate more than 100 GUIDs as it takes too long in the browser.");
  }

  var generateWithSymbols = $("#generateWithSymbols").prop("checked");
  var generateWithNumbers = $("#generateWithNumbers").prop("checked");
  var generateWithLowerCaseLetters = $("#generateWithLowerCaseLetters").prop("checked");
  var generateWithUpperCaseLetters = $("#generateWithUpperCaseLetters").prop("checked");
  var generateWithoutAmbigousCharaters = $("#generateWithoutAmbigousCharaters").prop("checked");
  var results = generate(numberToGenerate,
    generateLength,
    generateWithSymbols,
    generateWithNumbers,
    generateWithLowerCaseLetters,
    generateWithUpperCaseLetters,
    generateWithoutAmbigousCharaters);
  $("#results").text(results);
});

$("form").submit();

$("#copyToClipboard").click(function () {
  var resultsNode = $("#results").get(0);
  resultsNode.select();
  // https://gist.github.com/DominicTobias/12dcc416026d33b601f6d7d09fbcdff1

  try {
    var result = document.execCommand('copy');
    if (!result) {
      console.log('Copy to clipboard failed');
    }
  } catch (err) {
    console.log('Copy to clipboard failed');
  }

  window.getSelection().removeAllRanges();
});