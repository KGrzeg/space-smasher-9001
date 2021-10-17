import DefaultScene from '../scenes/DefaultScene'

export default class DifficultyManager {
  readonly spawnInterval = 1500 //ms
  readonly maxAsteroids = 300
  readonly intervalDecrementPerLevel = 30

  private scene: DefaultScene
  private difficultyLevel = 1
  private points = 0

  private spawnAtOnce = 1

  constructor(scene: DefaultScene) {
    this.scene = scene

    scene.events.on('asteroid:destroy', () => {
      this.points += 1
      this.scene.events.emit("getpoint", this.difficultyLevel)

      if (this.points % 10 == 0)
        this.levelUp()
    })

    scene.time.addEvent({
      delay: this.spawnInterval,
      callback: this.spawnAsteroids,
      callbackScope: this,
      repeat: -1
    });
  }

  levelUp() {
    this.difficultyLevel += 1
    this.spawnAtOnce += 1
    this.scene.events.emit("lvlup", this.difficultyLevel)
  }

  spawnAsteroids() {
    for (let i = 0; i < this.spawnAtOnce; ++i)
      this.scene.spawnAsteroid()
  }

  getMaxAsteroids() {
    return Math.min(this.difficultyLevel * 5, this.maxAsteroids)
  }

  getLevel() {
    return this.difficultyLevel
  }

  getPoints() {
    return this.points
  }
}
