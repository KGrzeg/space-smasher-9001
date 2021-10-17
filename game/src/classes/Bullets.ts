import Phaser from 'phaser'
import Bullet from './Bullet'
import Ship from './Ship'

export default class Bullets extends Phaser.Physics.Arcade.Group {
  readonly cooldown: number //ms

  lastShoot = 0

  constructor(scene: Phaser.Scene, fireRate: number) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 30,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet
    });

    this.cooldown = 1000 / fireRate
  }

  fireBullet(time: number, shooter: Ship) {
    let bullet = this.getFirstDead(false)

    if (bullet && this.lastShoot + this.cooldown <= time) {
      bullet.fire(shooter.x, shooter.y, shooter.rotation)
      this.lastShoot = time
      return true
    }

    return false
  }
}
