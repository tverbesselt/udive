var express = require('express');
var app = express()
.get('/power', function (req, res) {
    var spawn = require('child_process').spawn;
    var prc = spawn('python', ['/home/pi/pyDive/pytest.py', '0']);

    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString();
        var lines = str.split(/(\r?\n)/g);
        res.send(200, lines.join(""));
    });

    prc.on('close', function (code) {
        console.log('process exit code ' + code);
    });
})
.listen(8000);

console.log('Web Server running at http://127.0.0.1:8000');
