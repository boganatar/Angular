// Edit package.json by adding necessary node modules:         "body-parser": "~1.12.4",         "cookie-parser": "~1.3.5",         "express-session": "~1.7.6",         "connect-mongo" : "*"

 var express = require('express');
 var app = express();

 var path = require('path');
 var session = require('express-session');
 var bodyParser = require('body-parser');
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());

 app.use(session({
       secret: 'angular_tutorial',
       resave: true,
       saveUninitialized: true
 }));

 app.get("/notes", function(req,res) {
      res.send(req.session.notes||[]);
 });

/* app.get("/notes", function(req,res) {
    res.send({"1":"1", "2":"2", "3":"333"});
 });*/

 app.post("/notes", function(req, res) {
    if (!req.session.notes) {
               req.session.notes = [];
               req.session.last_note_id = 0;
    }
    var note = req.body;
     alert(note);
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    res.end();
 });

 app.listen(3000);