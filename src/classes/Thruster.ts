import Phaser from 'phaser'
import Utils from './Utils'

export default class Thruster {
  readonly angleSpan = 40
  readonly frequency = 100
  readonly speed = 100
  readonly framesIndex = 30

  emitter: Phaser.GameObjects.Particles.ParticleEmitter
  parent: Phaser.Physics.Arcade.Sprite

  constructor(scene: Phaser.Scene, parent: Phaser.Physics.Arcade.Sprite) {
    this.emitter = scene.add.particles('particles')
      .createEmitter({
        frame: [25, 26, 27, 28, 29, 30, 31, 32, 34, 35],
        speed: this.speed,
        frequency: this.frequency,
        scale: { start: 0.2, end: 0 },
        blendMode: 'ADD',
        follow: parent
      })

    this.parent = parent
  }

  update(time: number, delta: number) {
    const thrustDirection = Phaser.Math.RadToDeg(
      this.parent.body.velocity.clone().negate().angle()
    )

    this.emitter.angle.start = thrustDirection - this.angleSpan / 2
    this.emitter.angle.end = thrustDirection + this.angleSpan / 2

    const thrustPower = this.getThrustPower()

    this.emitter.setFrequency(thrustPower.frequency)
    this.emitter.setAlpha(thrustPower.opacity)
  }

  getThrustPower() {
    const velocityRange = [0, 320] as const
    const frequencyRange = [300, 0] as const
    const opacityRange = [0, 1] as const

    return {
      frequency: Utils.clampMap(
        this.parent.body.velocity.length(),
        ...velocityRange,
        ...frequencyRange
      ),
      opacity: Utils.clampMap(
        this.parent.body.velocity.length(),
        ...velocityRange,
        ...opacityRange
      )
    }
  }
}
