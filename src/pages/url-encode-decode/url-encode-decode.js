function encode() {
  var $inputText = $('inputText');
  var inputText = $inputText.getProp('value');
  $inputText.setProp('value', encodeURIComponent(inputText).replace(/'/g, "%27").replace(/"/g, "%22"));
}

function decode() {
  var $inputText = $('inputText');
  var inputText = $inputText.getProp('value');
  $inputText.setProp('value', decodeURIComponent(inputText.replace(/\+/g, " ")));
}

function copyToClipboard() {
  $('inputText').copyToClipboard();
}