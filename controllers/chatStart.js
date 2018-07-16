var express = require('express');
var app = express();

var Bot_basic = require ('../models/bot_basic');
var User_sessions_informations = require ('../models/user_sessions_informations');

var async = require('async');
var bodyParser = require("body-parser");

//implement the chat here
exports.index = function(req, res, next) { 
        //res.send("Hier wird der chat zwisschen " + app.locals.bot1 + " und " + app.locals.bot2 + " stattfinden.");
        res.render("chat", {title: "Hier wird der chat zwisschen " + app.locals.bot1 + " und " + app.locals.bot2 + " stattfinden."})
};


//search fot the selected bots in the database 
exports.searchForBothToken = function (req, res, next) {
        app.locals.bot1 = req.body.bot1;
        app.locals.bot2 = req.body.bot2;
        app.locals.userId = req.body.userId;

        console.log("ka zaj?"+ req.body.userId);

        userData = { user_id: req.body.userId, bot1: app.locals.bot1, bot2: app.locals.bot2 }
/*
        Bot_basic.insertOne(userData, function(err, res) {
                if(err) throw err;
                console.log("hat funktioniert mit mongo");
        })
*/
        User_sessions_informations.create(userData, function (err, User_sessions_informations) {
                if (err) return handleError(err);
                // saved!
              });

        //User_sessions_information.save({ _id: 100, name: "water", image_path: 30 })
    
        //search for the Token from bot1
        Bot_basic.findOne({ 'name': app.locals.bot1 }, 'name image_path workspace_id_token username_token password_token', function (err, bot_1) {
                if (err) return handleError(err);
                //console.log("Der Token von " + bot_1.name + " ist " + bot_1.workspace_id_token);
              });
        //search for the Token from bot2
        Bot_basic.findOne({ 'name': app.locals.bot2 }, 'name image_path workspace_id_token username_token password_token', function (err, bot_2) {
                if (err) return handleError(err);
                //console.log("Der Token von " + bot_2.name + " ist " + bot_2.workspace_id_token);
                return bot_2
              });          
    }


   