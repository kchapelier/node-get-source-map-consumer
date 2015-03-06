# node-get-source-map-consumer
Get an instance of SourceMapConsumer, when a sourcemap is available, for a given script.

## Exemple

```js
var getSourceMapConsumer = require('get-source-map-consumer');

getSourceMapConsumer('http://www.mysite.com/scripts/script.min.js', function (error, sourceMapConsumer) {
    if (!error) {
        // we have an instance of SourceMapConsumer to use
        console.log(sourceMapConsumer.originalPositionFor({
            line: 1,
            column: 12
        }));
    }
});

```
