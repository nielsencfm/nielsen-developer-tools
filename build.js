var glob = require("glob");
const fs = require('fs-extra');
const ejs = require('ejs');

glob("pages/**/*.json", null, function (er, files) {
  var layout = fs.readFileSync("src/layout.ejs", 'utf8');
  let template = ejs.compile(layout);

  files.forEach(function (fileName) {
    const pageSettings = fs.readJsonSync(fileName);
    var output = template(pageSettings);
    fs.writeFileSync("dist/" + pageSettings.url, output, 'utf-8');
  });
});
