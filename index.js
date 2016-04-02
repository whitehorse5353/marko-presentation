var express = require('express'),
    app = express(),
    promise = require('promise'),
    path = require('path'),
    marko = require('marko');

function composedData() {
    var delay = 3500,
        data = {
            items: [1, 2, 3, 4, 5]
        };
    return new promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(data);
        }, delay);
    });
}

app.set('view engine', 'jade');

app.get('/jade', function (req, res) {
    composedData().then(function (readData) {
        res.render('index', {name: 'alex', composedData: readData});
    });
});

app.get('/marko', function (req, res) {
    var tpl = marko.load(path.join(process.cwd(), './views/index.marko'));
    tpl.render({
        name: 'alex',
        composed: composedData
    }, res);
});

app.listen(9000, function () {
    console.log('app listening on port 9000');
});