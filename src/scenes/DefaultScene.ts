import Phaser from 'phaser'
import Ship from '../classes/Ship'
import Asteroid from '../classes/Asteroid'

export default class DefaultScene extends Phaser.Scene {
  readonly maxAsteroids = 70

  player?: Ship
  rotFrames?: Phaser.Types.Animations.AnimationFrame[]
  asteroids?: Phaser.GameObjects.Group

  constructor() {
    super('default-scene')
  }

  preload() {
    this.load.image('sky', 'assets/img/nebula10.png')
    this.load.image('logo', 'assets/img/phaser3-logo.png')
    this.load.image('ship', 'assets/img/ship.png')
    this.load.image('bullet', 'assets/img/bullet.png')
    this.load.spritesheet('particles', 'assets/img/boom.png', { frameWidth: 192, frameHeight: 192 })
    this.load.multiatlas('asteroids', 'assets/img/asteroids.json', 'assets/img');
  }

  create() {
    this.asteroids = this.add.group()

    Asteroid.createAnimations(this)
    this.add.image(400, 300, 'sky')

    this.player = new Ship(this)
    this.time.addEvent({
      delay: 1500,  // ms
      callback: this.spawnAsteroids,
      callbackScope: this,
      repeat: -1
    });

    this.hookupCollisions()
  }

  spawnAsteroids() {
    if (this.asteroids!.getLength() < this.maxAsteroids)
      this.asteroids!.add(new Asteroid(this))
  }

  hookupCollisions() {
    // player - asteroids
    this.physics.add.overlap(
      this.player!, this.asteroids!, // colliders
      this.player!.gotHit, // callback
      undefined, // callback filter
      this.player // 'this' for callback
    )

    // bullets - asteroids
    this.physics.add.overlap(
      this.asteroids!, this.player!.bullets,
      Asteroid.prototype.gotHit
    )
  }
}
