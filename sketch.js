const config = {
    preload: {
        ship: {
            spritesheet: '',
            spritedata: ''
        }
    },
    world: {
        width: 3200,
        height: 2400
    },
    viewport: {
        width: 800,
        height: 600
    },
    boats: 10
}
let player
let boats = []

function preload() {
    config.preload.ship.spritedata = loadJSON('ship-sprite.json')
    config.preload.ship.spritesheet = loadImage('ship-sprite.png')
}

function setup() {
    const { viewport: { width, height }, preload: { ship } } = config

    createCanvas(width, height)

    player = new Ship(width / 2, height / 2, ship)
    player.draw()

    for (let i = 0; i < config.boats; i++) {
        let boat = new Boat(random(0, width), random(0, height), 'right', ship)
        boats.push(boat)
        boat.draw()
        console.log(width)
    }
}

function draw() {
    background('#4488aa')
    boats.forEach(boat => boat.update())
    player.update()
}