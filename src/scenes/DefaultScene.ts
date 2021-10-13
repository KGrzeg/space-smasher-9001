import Phaser from 'phaser'
import Ship from '../classes/Ship'

export default class DefaultScene extends Phaser.Scene {
    player?: Ship

    constructor() {
        super('default-scene')
    }

    preload() {
        this.load.image('sky', 'assets/img/nebula10.png')
        this.load.image('logo', 'assets/img/phaser3-logo.png')
        this.load.image('ship', 'assets/img/ship.png')
        this.load.spritesheet('particles', 'assets/img/boom.png', { frameWidth: 192, frameHeight: 192 })
    }

    create() {
        this.add.image(400, 300, 'sky')

        const particles = this.add.particles('particles', 21)

        const emitter = particles.createEmitter({
            speed: 300,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        logo.setVelocity(100, 200)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)

        this.player = new Ship(this)
    }
}
