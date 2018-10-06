$("errorMessage").hide();

function showError(message) {
  $("errorMessage").show().appendContent("<p>" + message + "</p>");
}

function submitForm(event) {
  if (event) {
    event.preventDefault();
  }
  $("errorMessage").hide();
  $("errorMessage").setContent("");

  var numberOfRandomNumbersToGenerate = $("numberOfRandomNumbersToGenerate").getNumber();
  if (numberOfRandomNumbersToGenerate > 10000) {
    showError("WARNING: This generator will not find more than 10,000 random numbers as it takes too long to render in the browser.");
    numberOfRandomNumbersToGenerate = 10000;
  }

  var minimumResultRange = $("minimumResultRange").getNumber();
  if (minimumResultRange < Number.MIN_SAFE_INTEGER) {
    showError("WARNING: The JavaScript number type is a double-precision floating-point number as specified in IEEE 754 and can only safely represent integers above -9007199254740991 so if the range is beneath this number the random numbers generated will not be uniformly distributed.");
  }

  var maximumResultRange = $("maximumResultRange").getNumber();
  if (maximumResultRange > Number.MAX_SAFE_INTEGER) {
    showError("WARNING: The JavaScript number type is a double-precision floating-point number as specified in IEEE 754 and can only safely represent integers below 9007199254740991 so if the range is beneath this number the random numbers generated will not be uniformly distributed.");
  }

  var range = maximumResultRange - minimumResultRange + 1;
  var results = ""
  for (var i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    var randomNumber = Math.floor((Math.random() * range) + minimumResultRange);
    results += randomNumber + "\n"
  }

  $("results").setContent(results);
  return false;
}

function copyToClipboard() {
  $("results").copyToClipboard();
}