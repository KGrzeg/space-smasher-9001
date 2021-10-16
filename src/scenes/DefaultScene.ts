import Phaser from 'phaser'
import Ship from '../classes/Ship'
import Asteroid from '../classes/Asteroid'

export default class DefaultScene extends Phaser.Scene {
  readonly maxGameObjects = 100

  player?: Ship
  rotFrames?: Phaser.Types.Animations.AnimationFrame[]

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
    Asteroid.createAnimations(this)
    this.add.image(400, 300, 'sky')

    this.player = new Ship(this)
    this.time.addEvent({
      delay: 1500,  // ms
      callback: this.spawnAsteroids,
      callbackScope: this,
      repeat: -1
    });
  }

  spawnAsteroids() {
    if (this.children.length < this.maxGameObjects)
      new Asteroid(this)
  }
}
