class Forest {
    
    /**
     * @param  {} density in trees per 100 px
     */
    constructor(treesPer100){
        this.treesPer100 = treesPer100
        this.trees = []
        this.plant()
        this.sunlight = new Sunlight(3)
    }

    plant(){
        let density = this.treesPer100/100
        let numTrees = density*width
        for (let i = 1; i < numTrees; i++){
            this.trees.push(new Tree(i/density, height, Math.random()*80+5, Math.random()*0.3+0.7))
        }
    }

    progress(){
        //normally a generation will last until they are all dead
        if (!this.sunlight.isNight()){
            this.sunlight.move()
            this.sunlight.checkCollisionsWith(this.trees)
            this.sunlight.draw()
            this.draw()
        } else {
            this.grow()
            this.sunlight = new Sunlight(3)
            this.showEnergies()
            this.killBadTrees()
            this.resetEnergies()
        }
    }

    killBadTrees(){
        this.trees.sort((a, b) => {
            let eA = a.energy
            let eB = b.energy
            if (eA < eB) return 1
            if (eA > eB) return -1
            return 0
        })
        let generation = this.trees[0].generation
        let i = 0
        for (i = 0; i < this.trees.length; i++){
            if (this.trees[i].energy < Tree.energyNeededPerGeneration[generation]) break
        }
        this.trees.splice(i, this.trees.length-i)
    }

    killWorstNTrees(n){
        this.trees.sort((a, b) => {
            let eA = a.energy
            let eB = b.energy
            if (eA < eB) return 1
            if (eA > eB) return -1
            return 0
        })
        this.trees.splice(this.trees.length-n, n)
    }

    showEnergies(){
        let energies = "generation: " + this.trees[0].generation + ": "
        this.trees.forEach((tree) => {
            energies += " "+tree.energy
        })
        console.log(energies)
    }

    resetEnergies(){
        this.trees.forEach((tree) => tree.resetEnergy())
    }

    grow(){
        this.trees.forEach((tree) => tree.grow())
    }

    draw(){
        this.trees.forEach((tree) => tree.draw())
    }


}