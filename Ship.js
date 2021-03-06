class Ship {

    constructor(x, y, preloadedData) {
        this.width = 32
        this.height = 32
        this.direction = 'right'
        this.reloadTimer = null
        this.maxSpeed = 1
        this.pos = createVector(x, y)
        this.image = preloadedData.image
        this.imageData = preloadedData.data.frames
    }

    getImage(frames, direction) {
        return frames.find(frame => frame.name === `ship-${direction}`)
    }

    getDirection(currentPos, speed) {
        const velocityVector = this.getVelocityVector(currentPos, speed)
        const currentAngle = degrees(velocityVector.heading()).toFixed(2)
        const targetDistance = this.getDistance(currentPos, createVector(mouseX, mouseY))

        if (targetDistance < 0.6) {
            return this.direction
        }

        switch (true) {
            case (currentAngle > -135 && currentAngle < -45):
                return 'up';
            case (currentAngle > 45 && currentAngle < 135):
                return 'down';
            case (currentAngle > 135 || currentAngle < -135):
                return 'left';
            case (currentAngle > -45 && currentAngle < 45):
                return 'right';
            default:
                return this.direction
        }
    }

    getDistance(base, target) {
        return target.dist(base)
    }

    getVelocityVector(currentPos, speed) {
        const mousePos = createVector(mouseX, mouseY)
        const distance = this.getDistance(mousePos, currentPos)
        const distanceVector = mousePos.sub(currentPos)
        const normalizedPos = distanceVector.normalize()
        const mappedDistance = map(distance, 100, 0, speed, 0.5)
        const newPosVector = normalizedPos.mult(mappedDistance)

        return newPosVector
    }

    getNewPosition(currentPos, speed) {
        const velocityVector = this.getVelocityVector(currentPos, speed)

        return currentPos.add(velocityVector)
    }

    startReload() {
        this.reloadTimer = setTimeout(() => {
            this.reloadTimer = null
        }, 1000)
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
        this.pos = this.getNewPosition(this.pos, this.maxSpeed)
        this.direction = this.getDirection(this.pos, this.maxSpeed)
        this.draw()
    }

}