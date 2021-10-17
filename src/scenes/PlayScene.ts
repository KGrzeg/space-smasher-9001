import Phaser from 'phaser'
import Ship from '../classes/Ship'
import Asteroid from '../classes/Asteroid'
import DifficultyManager from '../classes/DifficultyManager'

export default class PlayScene extends Phaser.Scene {
  readonly maxAsteroids = 70

  player?: Ship
  rotFrames?: Phaser.Types.Animations.AnimationFrame[]
  asteroids?: Phaser.GameObjects.Group
  difficulty?: DifficultyManager
  points = 0
  progressLabel?: Phaser.GameObjects.Text
  background?: Phaser.GameObjects.Image
  backgroundOrder: number[] = []
  backgroundId = 0

  constructor() {
    super('play-scene')

    this.backgroundOrder = []
    for (let i = 1; i < 10; ++i)
      this.backgroundOrder.push(i)
    Phaser.Utils.Array.Shuffle(this.backgroundOrder)
  }

  preload() {
    for (let i = 1; i < 10; i++)
      this.load.image(`sky${i}`, `assets/img/nebula0${i}.png`)
    this.load.image('logo', 'assets/img/phaser3-logo.png')
    this.load.image('ship', 'assets/img/ship.png')
    this.load.image('bullet', 'assets/img/bullet.png')
    this.load.spritesheet('particles', 'assets/img/boom.png', { frameWidth: 192, frameHeight: 192 })
    this.load.multiatlas('asteroids', 'assets/img/asteroids.json', 'assets/img');
  }

  create() {
    Asteroid.createAnimations(this)
    this.difficulty = new DifficultyManager(this)
    this.events.on('getpoint', this.updateLabel, this)
    this.events.on('lvlup', this.updateLabel, this)
    this.events.on('lvlup', this.changeBackground, this)
    this.events.on('ship:gothit', this.updateLabel, this)
    this.events.on('ship:destroyed', this.gameOver, this)

    this.background = this.add.image(400, 300, 'sky1')
    this.asteroids = this.add.group()
    this.player = new Ship(this)
    this.progressLabel = this.add.text(5, 5, "", {
      font: '32px Arial',
      color: 'cyan'
    })
    this.progressLabel.setDepth(1)

    this.changeBackground()
    this.updateLabel()
    this.hookupCollisions()
  }

  gameOver() {
    console.log("%cU ded", "color:red")
    console.log("points: ", this.difficulty!.getPoints())
  }

  changeBackground() {
    const currentId = this.backgroundOrder[this.backgroundId]
    const key = 'sky' + currentId.toString()

    this.background!.setTexture(key)
    this.backgroundId = (++this.backgroundId) % this.backgroundOrder.length
  }

  spawnAsteroid() {
    if (this.asteroids!.getLength() < this.difficulty!.getMaxAsteroids())
      this.asteroids!.add(new Asteroid(this))
  }

  updateLabel() {
    const lvl = this.difficulty!.getLevel()
    const pts = this.difficulty!.getPoints()
    const lives = this.player!.life

    const str = `Level: ${lvl}\tPoints: ${pts}\tHP: ${lives}`
    this.progressLabel!.text = str
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
