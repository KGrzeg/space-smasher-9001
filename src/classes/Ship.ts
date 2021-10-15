import Phaser from 'phaser'
import Bullets from './Bullets'
import Thruster from './Thruster'

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  readonly acceleration = 5
  readonly dragForce = 0.6
  readonly maxSpeed = 300

  readonly colliderRadiusRatio = 0.43
  readonly wrapMargin = 10

  readonly fireRate = 5 //shoots/s

  bullets: Bullets
  thruster: Thruster

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.physics.world.bounds.centerX,
      scene.physics.world.bounds.centerY,
      'ship'
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.input.on('pointermove', (pointer) => {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, pointer) + Math.PI / 2
    })

    this.setDamping(true)
    this.setDrag(this.dragForce)
    this.body.setCircle(this.width * this.colliderRadiusRatio)

    this.bullets = new Bullets(scene, this.fireRate)
    this.thruster = new Thruster(scene, this)
    this.setMaxVelocity(this.maxSpeed)
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    const keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    const keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    const keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    const keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    const vec = new Phaser.Math.Vector2(0, 0)

    if (keyUp.isDown) vec.y = -this.acceleration
    if (keyDown.isDown) vec.y = this.acceleration
    if (keyRight.isDown) vec.x = this.acceleration
    if (keyLeft.isDown) vec.x = -this.acceleration

    if (this.scene.input.activePointer.leftButtonDown())
      this.bullets!.fireBullet(time, this);

    this.rotation = Phaser.Math.Angle.BetweenPoints(
      this,
      this.scene.input.activePointer
    ) + Math.PI / 2

    this.body.velocity.add(vec)
    this.scene.physics.world.wrap(this, this.wrapMargin)
    this.thruster.update(time, delta)
  }
}
