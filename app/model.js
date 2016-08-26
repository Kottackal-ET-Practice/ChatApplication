// Whole-script strict mode syntax

"use strict";

var mongoose     = require('mongoose'); 

mongoose.Promise = require('bluebird');

var databaseName  = "chat"; // Name ofthe Database

// Define Schema for mongodb
var messageSchema = mongoose.Schema({
    message:        String,
    username:       String,
    time:           { type: Date, default: Date.now }
});

// Establish connection to mongodb
mongoose.connect('mongodb://localhost/' + databaseName, function (err) {
    if (err)
        throw err;
    else
        console.log('Database Connected');
});

// Export the module

module.exports = mongoose.model('message', messageSchema);

