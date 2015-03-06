"use strict";

var http = require('http'),
    fs = require('fs'),
    isUrl = require('is-url'),
    sourceMapResolve = require('source-map-resolve'),
    sourceMap = require("source-map");

var downloadFile = function downloadFile (url, callback) {
    http.get(url, function (response) {
        var body = '';
        response.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            callback(null, body);
        });
    }).on('error', function () {
        callback(true, null);
    });
};

var readLocalFile = function readLocalFile (uri, callback) {
    fs.readFile(uri, 'utf8', callback);
};

var getFile = function getFile (uri, callback) {
    if (isUrl(uri)) {
        downloadFile(uri, callback);
    } else {
        readLocalFile(uri, callback);
    }
};

var getSourceMapConsumerFromSource = function getSourceMapConsumerFromSource (source, url, callback) {
    sourceMapResolve.resolve(source, url, getFile, function (error, result) {
        var sourceMapConsumer = null;

        if (!error) {
            result.map.sourcesContent = result.sourcesContent;
            sourceMapConsumer = new sourceMap.SourceMapConsumer(result.map);
        }

        callback(error, sourceMapConsumer);
    });
};

var getSourceMapConsumer = function getSourceMapConsumer (sourceUrl, callback) {
    getFile(sourceUrl, function (error, source) {
        if (error) {
            callback(error, null);
        } else {
            getSourceMapConsumerFromSource(source, sourceUrl, callback);
        }
    });
};

module.exports = getSourceMapConsumer;
