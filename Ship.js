class Ship {

    constructor(x, y, preloadedData) {
        this.width = 32
        this.height = 32
        this.direction = 'right'
        this.moving = false
        this.reloading = false
        this.maxSpeed = 2
        this.pos = createVector(x, y)
        this.image = preloadedData.spritesheet
        this.imageData = preloadedData.spritedata.frames
    }

    getImage(frames, direction) {
        return frames.find(frame => frame.name === `ship-${direction}`)
    }

    isMoving() {
        if (
            keyIsDown(UP_ARROW) ||
            keyIsDown(DOWN_ARROW) ||
            keyIsDown(LEFT_ARROW) ||
            keyIsDown(RIGHT_ARROW)
        ) {
            return true
        }
        return false
    }

    getDirection() {
        if (keyIsDown(UP_ARROW)) {
            return 'up'
        }
        if (keyIsDown(DOWN_ARROW)) {
            return 'down'
        }
        if (keyIsDown(LEFT_ARROW)) {
            return 'left'
        }
        if (keyIsDown(RIGHT_ARROW)) {
            return 'right'
        }
    }

    getNewPosition(currentPos, direction, speed) {
        let movement
        switch (direction) {
            case 'up':
                movement = createVector(0, -speed)
                break
            case 'down':
                movement = createVector(0, speed)
                break
            case 'left':
                movement = createVector(-speed, 0)
                break
            case 'right':
                movement = createVector(speed, 0)
                break
        }

        return currentPos.add(movement)
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
        this.moving = this.isMoving()
        if (this.moving) {
            this.direction = this.getDirection()
            this.pos = this.getNewPosition(this.pos, this.direction, this.maxSpeed)
        }
        this.draw()
    }

}