var $ = function (id) {
  var _element = document.getElementById(id);
  return {
    hide: function () {
      _element.style.display = "none";
      return this;
    },
    show: function () {
      _element.style.display = "block";
      return this;
    },
    getProp: function (name) {
      return _element[name];
    },
    setProp: function (name, newValue) {
      _element[name] = newValue;
    },
    setContent: function (content) {
      _element.innerHTML = content;
      return this;
    },
    appendContent: function (content) {
      _element.innerHTML = _element.innerHTML + content;
      return this;
    },
    getNumber: function () {
      var raw = _element.value;
      return Number(raw);
    },
    copyToClipboard: function () {
      _element.select();

      try {
        var result = document.execCommand('copy');
        if (!result) {
          console.log('Copy to clipboard failed');
        }
      } catch (err) {
        console.log('Copy to clipboard failed');
      }

      window.getSelection().removeAllRanges();
    }
  };
}