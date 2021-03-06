const glob = require("glob");
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require("path");
var minify = require('html-minifier').minify;

fs.removeSync('dist')
fs.mkdirsSync('dist');
fs.copySync('src/index.html', 'dist/index.html');

glob("src/pages/**/*.json", null, function (er, files) {
  var layout = fs.readFileSync("src/layout.ejs", 'utf8');
  let template = ejs.compile(layout);

  var styles = fs.readFileSync("src/style.css", 'utf8');

  files.forEach(function (settingsFileName) {
    var extension = path.extname(settingsFileName);
    var pageName = path.basename(settingsFileName, extension);
    var pageFolderPath = path.dirname(settingsFileName);

    var styles = fs.readFileSync("src/style.css", 'utf8');
    var script = fs.readFileSync("src/script.js", 'utf8');

    var pageHtmlFileName = path.join(pageFolderPath, pageName + '.html');
    var pageHtml = fs.readFileSync(pageHtmlFileName, 'utf8');

    var pageScriptFileName = path.join(pageFolderPath, pageName + '.js');
    var pageScript = fs.readFileSync(pageScriptFileName, 'utf8');

    var pageStyleFileName = path.join(pageFolderPath, pageName + '.css');
    var pageStyle = fs.readFileSync(pageStyleFileName, 'utf8');

    const pageSettings = fs.readJsonSync(settingsFileName);
    pageSettings.style = styles;
    pageSettings.script = script;
    pageSettings.pageHtml = pageHtml;
    pageSettings.pageScript = pageScript;
    pageSettings.pageStyle = pageStyle;

    var output = template(pageSettings);
    // console.log('output', output);
    fs.writeFileSync("dist/" + pageSettings.url, output, 'utf-8');
  });

});
