$("#errorMessage").hide();

function showError(message) {
  $("#errorMessage").show().append("<p>" + message + "</p>");
}

$("form").submit(function () {
  $("#errorMessage").hide();
  $("#errorMessage").empty();

  var numberOfRandomNumbersToGenerateRaw = $("#numberOfRandomNumbersToGenerate").val();
  var numberOfRandomNumbersToGenerate = Number(numberOfRandomNumbersToGenerateRaw);
  if (numberOfRandomNumbersToGenerate > 10000) {
    showError("WARNING: This generator will not find more than 10,000 random numbers as it takes too long to render in the browser.");
  }

  var $minimumResultRange = $("#minimumResultRange").val();
  var minimumResultRange = Number($minimumResultRange);
  if (minimumResultRange < Number.MIN_SAFE_INTEGER) {
    showError("WARNING: The JavaScript number type is a double-precision floating-point number as specified in IEEE 754 and can only safely represent integers above -9007199254740991 so if the range is beneath this number the random numbers generated will not be uniformly distributed.");
  }

  var $maximumResultRange = $("#maximumResultRange").val();
  var maximumResultRange = Number($maximumResultRange);
  if (maximumResultRange > Number.MAX_SAFE_INTEGER) {
    showError("WARNING: The JavaScript number type is a double-precision floating-point number as specified in IEEE 754 and can only safely represent integers below 9007199254740991 so if the range is beneath this number the random numbers generated will not be uniformly distributed.");
  }

  var range = maximumResultRange - minimumResultRange + 1;
  var results = ""
  for (var i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    var randomNumber = Math.floor((Math.random() * range) + minimumResultRange);
    results += randomNumber + "\n"
  }

  $("#results").text(results);
});

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
})