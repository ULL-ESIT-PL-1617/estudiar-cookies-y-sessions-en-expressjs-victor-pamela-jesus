var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
  if (req.session && req.session.user === "jose" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "jose" || req.query.password === "hunter2") {
    req.session.user = "jose";
    req.session.admin = true;
    res.send("login success!");
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.get('/content', auth, function (req, res) {
    res.send("Este contenido necesita permisos de administrador.");
});

app.listen(3000);
console.log("app running at http://localhost:3000");
