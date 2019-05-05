var mongooes = require("mongoose");
var Schema = mongooes.Schema;
const autoIncrement = require("mongoose-auto-increment");
const db = require("../db");
var connection = mongooes.createConnection("mongodb://localhost:27017/weather", { useNewUrlParser: true });
autoIncrement.initialize(connection);

const weatherSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tempnow: {
        type: String,
        required: true
    },
    tempmax: {
        type: String,
        required: true
    },
    tempmin: {
        type: String,
        required: true
    },
    humid: {
        type: String,
        required: true
    },
    statenow: {
        type: String,
        required: true
    },
    uv: {
        type: String,
        required: true
    },
    winspeed: {
        type: String,
        required: true
    },
    day1: {
        type: String,
    },
    temp1: {
        type: String,
    },
    state1: {
        type: String,
    },
    day2: {
        type: String,
    },
    temp2: {
        type: String,
    },
    state2: {
        type: String,
    },
    day3: {
        type: String,
    },
    temp3: {
        type: String,
    },
    state3: {
        type: String,
    },
    day4: {
        type: String,
    },
    temp4: {
        type: String,
    },
    state4: {
        type: String,
    },
    day5: {
        type: String,
    },
    temp5: {
        type: String,
    },
    state5: {
        type: String,
    },
    day6: {
        type: String,
    },
    temp6: {
        type: String,
    },
    state6: {
        type: String,
    }
});
weatherSchema.plugin(autoIncrement.plugin, {
    model: "weather",
    field: "_id",
    startAt: 1
});
const weather = mongooes.model("weather", weatherSchema);
module.exports = weather;