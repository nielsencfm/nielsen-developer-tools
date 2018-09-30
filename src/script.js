var $ = function (selector) {
  var $elements = document.querySelectorAll(selector);

  function forEachElement(func) {
    for (i = 0; i < $elements.length; ++i) {
      func($elements[i]);
    }
  }

  return {
    get: function (index) {
      return $elements[index];
    },
    hide: function () {
      forEachElement(function (element) {
        element.style.display = "none";
      });
      return this;
    },
    show: function () {
      forEachElement(function (element) {
        element.style.display = "block";
      });
      return this;
    },
    empty: function () {
      forEachElement(function (element) {
        element.innerHTML = "";
      });
      return this;
    },
    append: function (content) {
      forEachElement(function (element) {
        element.innerHTML = element.innerHTML + content;
      });
      return this;
    },
    text: function (content) {
      forEachElement(function (element) {
        element.innerHTML = content;
      });
      return this;
    },
    click: function (callback) {
      forEachElement(function (element) {
        element.onclick = callback;
      });
    },
    val: function () {
      if ($elements.length > 0) {
        return $elements[0].value;
      }
    },
    prop: function (key) {
      if ($elements.length > 0) {
        return $elements[0][key];
      }
    },
    submit: function (callback) {
      forEachElement(function (element) {
        if (typeof callback === "function") {
          element.onsubmit = function (event) {
            event.preventDefault();
            callback();
            return false;
          }
        }
      });
    }
  }
}