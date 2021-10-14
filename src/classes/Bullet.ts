import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  readonly lifetime = 4000 //ms
  readonly speed = 600

  age = 0

  constructor(scene, x, y) {
    super(scene, x, y, 'bullet')
  }

  fire(x: number, y: number, rotation: number) {
    this.body.reset(x, y)
    this.rotation = rotation

    this.setActive(true)
    this.setVisible(true)

    const v = new Phaser.Math.Vector2(0, -this.speed)
    v.rotate(rotation)
    this.setVelocity(v.x, v.y)
    this.age = 0
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    this.age += delta

    if (this.age >= this.lifetime) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
