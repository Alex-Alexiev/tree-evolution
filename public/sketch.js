function setup(){
    createCanvas(innerWidth, 500)
    forest = new Forest(3)
}

function draw(){
    background(40, 100, 250)
    forest.progress()
}
