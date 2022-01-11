import Phaser from 'phaser'
import shipSprite from './assets/shipSprite.png'

let ship
let opponents
let cursors
const CONSTANTS = {
    WORLD: {
        WIDTH: 3200,
        HEIGHT: 2400
    },
    VIEWPORT: {
        WIDTH: 800,
        HEIGHT: 600
    },
    SHIP: {
        MOVE_SPEED: 80
    },
    OPPONENT_COUNT: 60
}

const config = {
    type: Phaser.AUTO,
    width: CONSTANTS.VIEWPORT.WIDTH,
    height: CONSTANTS.VIEWPORT.HEIGHT,
    backgroundColor: 0x4488aa,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config)

function preload() {
    this.load.spritesheet('ship', shipSprite, { frameWidth: 32, frameHeight: 32 })
}

function create() {
    this.cameras.main.setBounds(0, 0, CONSTANTS.WORLD.WIDTH, CONSTANTS.WORLD.HEIGHT);
    this.physics.world.setBounds(0, 0, CONSTANTS.WORLD.WIDTH, CONSTANTS.WORLD.HEIGHT);

    opponents = this.physics.add.staticGroup()
    for (let i = 0; i < CONSTANTS.OPPONENT_COUNT; i++) {
        opponents.create(Phaser.Math.Between(0,CONSTANTS.WORLD.WIDTH), Phaser.Math.Between(0,CONSTANTS.WORLD.HEIGHT), 'ship')
    }

    cursors = this.input.keyboard.createCursorKeys()

    ship = this.physics.add.sprite(CONSTANTS.WORLD.WIDTH / 2, CONSTANTS.WORLD.HEIGHT / 2, 'ship', 2)
    this.physics.add.collider(ship, opponents)
    this.cameras.main.startFollow(ship, true, 0.05, 0.05);

    ship.setBounce(0)
    ship.setCollideWorldBounds(true)

    this.anims.create({
        key: 'left',
        frames: [{ key: 'ship', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: [{ key: 'ship', frame: 2 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'up',
        frames: [{ key: 'ship', frame: 6 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'down',
        frames: [{ key: 'ship', frame: 7 }],
        frameRate: 20
    });
}

function update() {
    if (cursors.left.isDown) {
        ship.setVelocityX(-CONSTANTS.SHIP.MOVE_SPEED)
        ship.anims.play('left', true)
    }
    else if (cursors.right.isDown) {
        ship.setVelocityX(CONSTANTS.SHIP.MOVE_SPEED)
        ship.anims.play('right', true)
    }
    else {
        ship.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        ship.setVelocityY(-CONSTANTS.SHIP.MOVE_SPEED)
        ship.anims.play('up', true)
    }
    else if (cursors.down.isDown) {
        ship.setVelocityY(CONSTANTS.SHIP.MOVE_SPEED)
        ship.anims.play('down', true)
    }
    else {
        ship.setVelocityY(0)
    }
}