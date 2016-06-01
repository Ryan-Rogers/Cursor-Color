var canvas = document.getElementById("cursorColorCanvas");
var context = canvas.getContext("2d");
var map = [];

var numToName = {
    "1" : "red",
    "2" : "green",
    "3" : "blue"
};

var nameToColor = {
    "red" : "#FF0000",
    "green" : "#00FF00",
    "blue" : "#0000FF"
};

var numToRule = [
    ruleSpreadPlus,
    ruleSpreadX,
    ruleSpreadVert
];

var ruleSpreadPlus = function(row, col) {
    map[row -1][col], map[row +1][col], map[row][col -1], map[row][col +1] = map[row][col];
};

var ruleSpreadX = function(row, col) {
    map[row -1][col -1], map[row +1][col +1], map[row -1][col +1], map[row +1][col -1] = map[row][col];
};

var ruleSpreadVert = function(row, col) {
    map[row][col -1], map[row][col +1] = map[row][col];
};

var createMap = function() {
    for (var row = 0; row < context.canvas.height; row += 1) {
        map[row] = [];
        for (var col = 0; col < context.canvas.width; col += 1) {
            map[row][col] = (row + col) % 4;
        }
    }
};

var drawMap = function() {
    for (var row = 0; row < context.canvas.height; row += 1) {
        for (var col = 0; col < context.canvas.width; col += 1) {
            context.fillStyle = nameToColor[numToName[map[row][col]]];
            context.fillRect(col, row, 1, 1);
        }
    }
};

window.onload = function() {
    createMap();
    drawMap();
    for (var row = 0; row < context.canvas.height; row += 1) {
        for (var col = 0; col < context.canvas.width; col += 1) {
            numToRule[1](row, col);
        }
    }
    drawMap();
};
