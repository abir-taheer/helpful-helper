const db = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require("morgan");

const expressSession = require("express-session");

const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: (30 * 86400 * 1000),
    createDatabaseTable: true,
}, db.pool);

const session = expressSession({
    secret: "some_semi_permanent_not_so_secret_secret",
    name: "session",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: (30 * 86400 * 1000)
    }
});

app.use(session);

const app_port = process.env.PORT || 3001;

app.use(cookieParser("some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(require("./routes/api/user/state"));
app.use(require("./routes/auth/signup"));
app.use(require("./routes/auth/logout"));
app.use(require("./routes/auth/login"));


app.post('/', function(req, res) {
    const twilio = require('twilio');
    const twiml = new twilio.TwimlResponse();
    if (req.body.Body === 'hello') {
        twiml.message('Hi!');
    } else if(req.body.Body === 'bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('No Body param match, Twilio sends this in the request to your server.');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

// Send static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Send React App
app.route("*").get((req,res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(app_port, () => {
    console.log('listening on *:' + app_port);
});