var weath = "winter"

var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var HBomb = require("./modules/AtomicBomb.js");
var Gazanik = require("./Gazanik.js");
var BombFinder = require("./bombFinder.js");

grassArr = [];
grassEaterArr = [];
HBombArr = [];
gazanikArr = [];
bombFinderArr = [];
matrix = [];

function matrixGenerator(matrixSize, grass, grassEater, atomicBomb, gazanik, bombFinder) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); 
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < atomicBomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;

    }
    for (let i = 0; i < gazanik; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
}
matrixGenerator(20, 20, 10, 5, 12, 3);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


function creatingObjects() {
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {

            if (matrix[x][y] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[x][y] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);

            }
            else if (matrix[x][y] == 3) {
                var gazanik = new Gazanik(x, y);
                gazanikArr.push(gazanik);
            }
            else if (matrix[x][y] == 4) {
                var HBomb = new HBomb(x, y);
                HBombArr.push(HBomb);
            }
            else if (matrix[x][y] == 5) {
                var bombFinder = new BombFinder(x, y);
                bombFinderArr.push(bombFinder);
            }
        }
    }
}
creatingObjects();

function game() {

    if (grassArr[0] !== undefined) {
        for (let i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (let i in grassEaterArr) {
            grassEaterArr[i].eat();

        }
    }
    if (gazanikArr[0] !== undefined) {
        for (let i in gazanikArr) {
            gazanikArr[i].eat();
        }
    }
    if (bombFinderArr[0] !== undefined) {
        for (let i in bombFinderArr) {
            bombFinderArr[i].eat();
        }
    }
    if (gazanikArr.length >= 14) {
        var bomb = new HBomb()
        bomb.boom()
        for (let i in HBombArr) {
            HBombArr[i].gmp()
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        gazanCounter: gazanikArr.length,
        HCounter: HBombArr.length,
        bombFinder: bombFinderArr.length,
        eaterCounterCord: grassEaterArr,
    }
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)