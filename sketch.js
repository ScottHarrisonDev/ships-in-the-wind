const config = {
    preload: {
        ship: {
            spritesheet: 'ship-sprite.png',
            spritedata: 'ship-sprite.json'
        },
        cannonball: {
            image: 'cannonball.png'
        }
    },
    world: {
        width: 800,
        height: 600
    },
    boats: 10
}
let shipSprite = {}
let cannonballImg
let player
let boats = []
let cannonballs = []

function preload() {
    shipSprite.data = loadJSON(config.preload.ship.spritedata)
    shipSprite.image = loadImage(config.preload.ship.spritesheet)
    cannonballImg = loadImage(config.preload.cannonball.image)
}

function setup() {
    const { world: { width, height } } = config

    createCanvas(width, height)

    player = new Ship(width / 2, height / 2, shipSprite)
    player.draw()

    for (let i = 0; i < config.boats; i++) {
        let boat = new Boat(random(0, width), random(0, height), 'right', shipSprite)
        boats.push(boat)
        boat.draw()
    }
}

function draw() {
    background('#4488aa')
    boats.forEach(boat => boat.update())
    player.update()
    cannonballs.forEach(cannonball => cannonball.update())
}

function mousePressed() {
    if (player.reloadTimer) {
        return
    }
    player.startReload()
    const cannonball = new Cannonball(player.pos.x, player.pos.y, player.direction, {image: cannonballImg})
    cannonballs.push(cannonball)
}