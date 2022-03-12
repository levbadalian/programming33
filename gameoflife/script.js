// var socket = io(); 
var side = 30;
var weath = 'winter'
function setup() {
    createCanvas(20 * side, 20 * side)
    background('#acacac');

}

// socket.on("data", drawCreatures);
// socket.on("matrix", drawCreatures)
// socket.on("weather", function (data)
// {
    // weath = data;
// })
let grassCountElement = document.getElementById('grassCount');
let grassEaterCountElement = document.getElementById('grassEaterCount');
let bombCounter = document.getElementById('bomb');
let bombFinder = document.getElementById('bombFinder');

function drawCreatures(data) {
    

    console.log(data);
    console.log(data.count2);
    for(let i in data.eaterCounterCord)
    {
        console.log(data.eaterCounterCord[i] + "something");
    }
    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCounter;
    gazanCounter.innerText = data.gazanCounter;
    bombCounter.innerHTML = data.HCounter;
    bombFinder.innerHTML = data.bombFinder;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                if(weath == "spring")
                {
                    fill("green")
                }
                else if(weath == "summer")
                {
                    fill("black");
                }
                else if(weath == "winter")
                {
                    fill("white")
                }
                else if(weath == "autumn")
                {
                    fill("#4dffa6")
                }
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 2) 
            {
                fill("orange");
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 0) 
            {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 3) 
            {
                fill('red');
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 4) 
            {
                fill('blue');
                rect(j * side, i * side, side, side);
            } 
            else if (matrix[i][j] == 5) 
            {
                fill('yellow');
                rect(j * side, i * side, side, side);
            }
        }
    }
}