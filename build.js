#!/usr/bin/env node
var argv = require('optimist').argv;
var fs = require('fs');
var bookmarkletify = require('bookmarkletify');
var mu = require('mu2');

var scriptFile = 'workflowy-rollup.js';

var parseFiles = {
	'templates/demo.mustache': 'demo.html',
	'templates/README.mustache': 'README.md',
};

var content = fs.readFileSync(scriptFile, 'utf-8');
var bookmarkletString = bookmarkletify(content);

if (argv.v) {
	console.log(bookmarkletString);
}

var ctx = {'bookmarklet': bookmarkletString};
var outputBuffers = {};
var inFile;
var renderFile = function(inFile, outFile, ctx) {
	var buf = "";
	var stream = mu.compileAndRender(inFile, ctx);
	stream.on('data', function(data) { buf += data; });
	stream.on('end', function() {
		fs.writeFileSync(outFile, buf, 'utf-8');
	});
};
for (inFile in parseFiles) {
	if (parseFiles.hasOwnProperty(inFile)) {
		renderFile(inFile, parseFiles[inFile], ctx);
	}
}
