class Boat {

    constructor(x, y, direction, preloadedData) {
        this.width = 32
        this.height = 32
        this.direction = direction
        this.pos = createVector(x, y)
        this.image = preloadedData.spritesheet
        this.imageData = preloadedData.spritedata.frames
    }

    getImage(frames, direction) {
        return frames.find(frame => frame.name === `boat-${direction}`)
    }

    draw() {
        const { position: { x, y, w, h } } = this.getImage(this.imageData, this.direction)
        image(
            this.image,
            this.pos.x - (this.width / 2),
            this.pos.y - (this.height / 2),
            this.width,
            this.height,
            x,
            y,
            w,
            h
        )
    }

    update() {
        this.draw()
    }

}