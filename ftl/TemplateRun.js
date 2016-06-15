/**
 * Connect to JAR
 * from https://github.com/ijse/FED/blob/master/libs/modules/freemarker/TemplateRun.js
 */
var spawn = require('child_process').spawn;
var path = require("path");
var assign = require('object-assign');

var jarFile = path.join(__dirname, "/jar/FMtoll.jar");

//	dataModel - data model
//	settings - include `encoding` and `viewFolder`
//	fileName - template file name
exports.processTemplate = function(path, dataModel, settings, callback) {
	var dataModel = JSON.stringify(dataModel);
	var resultData = "";
	var cmd;
	var stdout;
	var stderr;

	settings = assign({
		encoding: 'utf-8',
		viewFolder: process.cwd()
	}, settings);

	settings = JSON.stringify(settings);
	cmd = spawn('java', ["-jar", jarFile, settings, path.substring(1), dataModel ]);
	stdout = cmd.stdout;
	stderr = cmd.stderr;

	callback(stdout, stderr);
	stderr.setEncoding('utf-8');
};
