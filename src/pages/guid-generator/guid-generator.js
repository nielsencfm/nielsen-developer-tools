$("errorMessage").hide();

function showError(message) {
  $("errorMessage").show().appendContent("<p>" + message + "</p>");
}

function generate(number, generateWithBraces, generateUppercase, generateWithHyphens) {
  var rval = "";
  for (var i = 0; i < number; i++) {
    var uuid = uuidv4();
    if (!generateWithHyphens) {
      uuid = uuid.replace(/[-]/g, "");
    }
    if (generateUppercase) {
      uuid = uuid.toUpperCase();
    }
    if (generateWithBraces) {
      uuid = "{" + uuid + "}";
    }
    rval += uuid + "\n";
  }
  return rval;
}

// Source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateUuid() {
  $("errorMessage").hide();
  $("errorMessage").setContent("");

  var numberToGenerate = $("numberToGenerate").getNumber();
  if (numberToGenerate > 10000) {
    showError("WARNING: This generator will generate more than 10,000 GUIDs as it takes too long in the browser.");
    numberToGenerate = 10000;
  }

  var generateWithBraces = $("generateWithBraces").getProp('checked');
  var generateUppercase = $("generateUppercase").getProp('checked');
  var generateWithHyphens = $("generateWithHyphens").getProp('checked');
  var results = generate(numberToGenerate, generateWithBraces, generateUppercase, generateWithHyphens)
  $("results").setContent(results);
}

function submitForm(event) {
  event.preventDefault();
  generateUuid();
  return false;
}

generateUuid();

function copyToClipboard() {
  $('results').copyToClipboard();
}