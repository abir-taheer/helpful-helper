const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require("morgan");

const app_port = process.env.PORT || 3001;

app.use(cookieParser("some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Send static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Send React App
app.route("*").get((req,res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(app_port, () => {
    console.log('listening on *:' + app_port);
});