class Sunlight {

    photons = []
    photonRadius = 3
    photonVelocity = 5

    dy = 20
    dx = 20

    xVariability = 20
    yVariability = 100
    vVariability = 3

    steps = 0

    static photonEnergy = 1

    constructor(layers) {
        this.layers = layers
        for (let y = -this.dy; y > layers * this.dy * -1; y -= this.dy) {
            for (let x = 0; x < width; x += this.dx) {
                this.photons.push({
                    "position": createVector(
                        x + Math.random() * this.xVariability - this.xVariability / 2,
                        y + Math.random() * this.yVariability - this.yVariability / 2
                    ), "exists": true
                })
            }
        }
    }

    checkCollisionsWith(trees) {
        trees.forEach((tree) => {
            tree.leaves.forEach((leaf) => {
                this.photons.forEach((photon) => {
                    if (photon.exists) {
                        if (Math.sqrt(Math.pow(photon.position.x - leaf.x, 2) + Math.pow(photon.position.y - leaf.y, 2)) <= this.photonRadius + Tree.leafRadius) {
                            tree.addEnergy(Sunlight.photonEnergy)
                            photon.exists = false
                        }
                    }
                })
            })
        })
    }

    draw() {
        this.photons.forEach((photon) => {
            if (photon.exists) {
                fill(255, 255, 0)
                strokeWeight(0)
                ellipse(photon.position.x, photon.position.y, this.photonRadius * 2, this.photonRadius * 2)
            }
        })
    }

    move() {
        this.steps++
        this.photons.forEach((photon) => {
            photon.position.y += this.photonVelocity + Math.random() * this.vVariability - this.vVariability / 2
        })
    }

    isNight() {
        return this.steps * this.photonVelocity > height + this.layers * this.dy
    }



}