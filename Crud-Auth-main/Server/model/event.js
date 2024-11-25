//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

const eventScheme = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String},
    location: {type: String,
    description: {type: String},

});
module.exports =mongoose.model('Event',eventSchema);
