class Turtle {

    stack = []

    constructor(position, step, thickness){
        this.position = position
        this.step = step
        this.thickness = thickness
    }

    stepForward(){
        this.position = this.position.add(this.step)
    }

    rotate(angle) {
        this.step.rotate(angle)
    }

    save() {
        this.stack.push({"position":this.position.copy(), "step":this.step.copy(), "thickness":this.thickness})
    }

    restore() {
        this.copyFrom(this.stack.pop())
    }

    copyFrom(turtle){
        this.position = turtle.position
        this.step = turtle.step
        this.thickness = turtle.thickness
    }

    thin(thicknessFactor){
        this.thickness /= thicknessFactor
    }

    lengthen(lengthFactor){
        this.step.mult(lengthFactor)
    }

}