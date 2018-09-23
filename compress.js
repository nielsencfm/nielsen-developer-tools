const glob = require("glob");
const fs = require('fs-extra');
var minify = require('html-minifier').minify;

glob("dist/**/*.html", null, function (er, files) {
  files.forEach(function (fileName) {
    var content = fs.readFileSync(fileName, 'utf8');
    content = minify(content, {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
    fs.writeFileSync(fileName, content, 'utf-8');
  });
});