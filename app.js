let express = require("express");
let app = express();

app.listen(3000, () => {

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/error.html');
});

app.use('/public', express.static(__dirname + '/public'));