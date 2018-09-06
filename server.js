const express = require('express');
const app = express();
var path = require('path');

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8')
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/bundle.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname + '/static/bundle.js'));
});

app.get('/media/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/static/media/${req.params.file}`));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));