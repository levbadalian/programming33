function generator(matLen, gr, grEat, pr,mush) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;

        }
    }
    for (let i = 0; i < mush; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;

        }
    }
    return matrix;
}
let side = 20;

let matrix = generator(12, 40, 40, 15, 8 , 5);

let grassArr = []
let grassEaterArr = []
let predatorArr = []
let MushroomArr = []
let Mushroom2Arr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(3)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE)
            } else if (matrix[y][x] == 3) {
                let grE = new Predator(x, y)
                predatorArr.push(grE)
            } else if (matrix[y][x] == 4) {
                let grE = new Mushroom(x, y)
                MushroomArr.push(grE)
            } else if (matrix[y][x] == 5) {
                let grE = new Mushroom2(x, y)
                MushroomArr.push(grE)
            }
        }
        console.log(grassArr);
    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
            } else if (matrix[y][x] == 0) {
                fill('#acacac')
            } else if (matrix[y][x] == 2) {
                fill('yellow')
            } else if (matrix[y][x] == 3) {
                fill('red')
            } else if (matrix[y][x] == 4) {
                fill('blue')
            } else if (matrix[y][x] == 5) {
                fill('purple')
            }
            rect(x * side, y * side, side, side)
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    // for (let i in MushroomArr) {
    //     MushroomArr[i].mul()
    //     MushroomArr[i].eat()
    // }
    
    // for (let i in Mushroom2Arr) {
    //     Mushroom2Arr[i].mul()
    //     Mushroom2Arr[i].eat()
    // }
}