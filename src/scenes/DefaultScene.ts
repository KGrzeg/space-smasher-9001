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
    this.load.image('bullet', 'assets/img/bullet.png')
    this.load.spritesheet('particles', 'assets/img/boom.png', { frameWidth: 192, frameHeight: 192 })
  }

  create() {
    this.add.image(400, 300, 'sky')

    
    this.player = new Ship(this)
  }
}
