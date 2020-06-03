function setup(){
    let canvas = createCanvas(innerWidth, 500)
    canvas.parent("canvas")
    forest = new Forest(3)
}

function draw(){
    background(40, 100, 250)
    forest.progress()
}
