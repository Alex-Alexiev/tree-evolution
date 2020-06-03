/*
    rules = [
        {
            x: "X",
            y: "F+[[X]-X]-F[-FX]+X" 
        },
        {
            x: "F",
            y: "FF"
        }
    ] 
    */
    /*
    rules = [
        {
            x: "X",
            y: "F[+X][-X]FX" 
        },
        {
            x: "F",
            y: "FF"
        }
    ] 
    */
     /*
    rules = [
        {
            x: "X",
            y: "[-FX][+FX][FX]" 
        },
        {
            x: "F",
            y: "FF"
        }
    ]
    */

class Tree {

    energy = 0

    static energyNeededPerGeneration = [0, 0, 1, 3, 6, 10, 15, 20]

    time = 0
    generation = 0
    lengthUnit = 0

    lengthPerTime = 3 //growth rate 

    initialThickness = 5
    thicknessFactor = 1.6

    generationStepLength = 40
    maxGeneration = 5

    leaves = []
    static leafRadius = 5
    
    axiom = "X"
    string = this.axiom
    
    rules = [
        {
            x: "X",
            y: "F[!%-X][!%+X]!%FX" 
        },
        {
            x: "F",
            y: "FF"
        }
    ] 
    
    constructor(x, y, branchingAngle, lengthFactor){
        this.x = x
        this.y = y 
        this.branchingAngle = branchingAngle
        this.lengthFactor = lengthFactor
    }

    grow(){
        this.time+=5
        let targetLength = this.time*this.lengthPerTime
        let currLength = Math.pow(2, this.generation)*this.lengthUnit
        if (targetLength/this.generationStepLength > this.generation && this.generation < this.maxGeneration){
            this.generation++
            this.nextGeneration()
        }
        this.lengthUnit = targetLength/(Math.pow(2, this.generation))
    }

    getString(){
        return this.string
    } 

    addEnergy(energy){
        this.energy += energy
    }

    resetEnergy(){
        this.energy = 0
    }

    nextGeneration(){
        let result = ""
        let stringArr = [...this.string]
        stringArr.forEach(char => {
            let produced = false
            this.rules.forEach(rule => {
                if (rule.x == char){
                    result += rule.y
                    produced = true
                } 
            })       
            if (!produced) {
                result += char
            }
        })
        this.string = result 
    }

    draw(){
        this.turtle = new Turtle(createVector(this.x, this.y), createVector(0, -1).mult(this.lengthUnit), this.initialThickness)
        let stringArr = [...this.string]
        stringArr.forEach(char => {
            if (char == "F"){
                stroke(150, 150, 0)
                strokeWeight(this.turtle.thickness)
                line(this.turtle.position.x, this.turtle.position.y, this.turtle.position.x + this.turtle.step.x, this.turtle.position.y + this.turtle.step.y)
                this.turtle.stepForward()
            } else if (char == "+"){
                this.turtle.rotate(-this.branchingAngle*Math.PI/180)
            } else if (char == "-"){
                this.turtle.rotate(this.branchingAngle*Math.PI/180)
            } else if (char == "["){
                this.turtle.save()
            } else if (char == "]"){
                fill(15, 163, 10)
                strokeWeight(0)
                ellipse(this.turtle.position.x, this.turtle.position.y, Tree.leafRadius*2, Tree.leafRadius*2)
                this.leaves.push(createVector(this.turtle.position.x, this.turtle.position.y))
                this.turtle.restore()
            } else if (char == "!") {
                this.turtle.thin(this.thicknessFactor)
            } else if (char == "%"){
                this.turtle.lengthen(this.lengthFactor)
            }
        })
        this.turtle = new Turtle(createVector(this.x, this.y), createVector(0, -1).mult(this.lengthUnit), this.initialThickness)
    }

}