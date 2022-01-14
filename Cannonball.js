class Cannonball {

    constructor(x, y, shipDirection, preloadedData) {
        this.width = 7
        this.height = 7
        this.direction = this.translateDirection(shipDirection)
        this.maxSpeed = 7
        this.pos = createVector(x, y)
        this.image = preloadedData.image
    }

    translateDirection(shipDirection) {
        switch (shipDirection) {
            case 'up':
                return 'right';
            case 'down':
                return 'left';
            case 'right':
                return 'down';
            case 'left':
                return 'up';
        }
    }

    getNewPosition(currentPos, direction, speed) {
        let newPosition;
        switch (direction) {
            case 'up':
                newPosition = createVector(currentPos.x, currentPos.y - speed)
                break
            case 'down':
                newPosition = createVector(currentPos.x, currentPos.y + speed)
                break
            case 'right':
                newPosition = createVector(currentPos.x + speed, currentPos.y)
                break
            case 'left':
                newPosition = createVector(currentPos.x - speed, currentPos.y)
                break
        }

        return newPosition
    }

    draw() {
        image(
            this.image,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        )
    }

    update() {
        this.pos = this.getNewPosition(this.pos, this.direction, this.maxSpeed)
        this.draw()
    }

}