/*eslint-disable */
/**
 * Created by awaseem on 15-11-21.
 */

var express = require("express");

var app = express();

app.use("/bundle.js",express.static(__dirname + "/build/bundle.js"));


app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
});

app.listen(3000, function () {
    console.log( "Running on localhost:3000" );
});
