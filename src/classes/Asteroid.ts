import Phaser from 'phaser'
import Bullet from '../classes/Bullet'

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
  // asteroid can't kill player
  // if younger than unbornAge in ms
  static unbornAge = 1000

  readonly wrapMargin = 30
  readonly scaleMin = 0.7
  readonly scaleMax = 1.3
  readonly scaleRotationFactor = 0.4

  age = 0

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      Phaser.Math.RND.integerInRange(0, scene.physics.world.bounds.width),
      Phaser.Math.RND.integerInRange(0, scene.physics.world.bounds.height),
      'asteroids'
    )

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCircle(30, 30, 30)
    this.setScale(Phaser.Math.RND.realInRange(this.scaleMin, this.scaleMax))
    this.setVelocity(
      Phaser.Math.RND.realInRange(-100, 100),
      Phaser.Math.RND.realInRange(-100, 100)
    )
    this.setRandomShade()
    
    this.anims.play(Asteroid.getRandomAnimationName())
    this.anims.timeScale = 1 + (this.scaleMax - this.scale) * this.scaleRotationFactor
    if (Phaser.Math.RND.integer() % 2 == 0)
      this.anims.reverse()
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    this.scene.physics.world.wrap(this, this.scale * this.wrapMargin)
    this.age += delta
  }

  gotHit(me, bullet) {
    if (!(bullet instanceof Bullet)) return
    if (bullet.active == false) return

    me.destroy() // TODO: use objects pool
    bullet.setActive(false)
    bullet.setVisible(false)
  }

  private setRandomShade() {
    const color = new Phaser.Display.Color()
    color.randomGray(0xa0) //the darkest possible dye is 0xa0a0a0
    this.setTint(color.color)
  }

  static createAnimations(scene: Phaser.Scene) {
    ["a", "b", "c", "d"].forEach((animationName, i) => {
      const frames = scene.anims.generateFrameNames('asteroids', {
        start: 0, end: 15,
        zeroPad: 4,
        prefix: `${animationName}4`
      });

      scene.anims.create({
        key: `asteroid${i}`,
        frames: frames,
        frameRate: 16,
        repeat: -1
      })
    })
  }

  static getRandomAnimationName() {
    const animationsAmount = 3
    const id = Phaser.Math.RND.integerInRange(0, animationsAmount)
    return `asteroid${id}`
  }
}
