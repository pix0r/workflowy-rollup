var fs = require('fs');
var bookmarkletify = require('bookmarkletify');
var mu = require('mu2');

var scriptFile = 'workflowy-rollup.js';
var templateFile = 'demo.mustache';
var outputFile = 'demo.html';

var content = fs.readFileSync(scriptFile, 'utf-8');
var bookmarkletString = bookmarkletify(content);

var outStream = mu.compileAndRender(templateFile, {'bookmarklet': bookmarkletString});
var outString = "";
outStream.on('data', function(data) {
	outString += data;
});
outStream.on('end', function() {
	fs.writeFileSync(outputFile, outString, 'utf-8');
	console.log("Updated " + outputFile);
});
