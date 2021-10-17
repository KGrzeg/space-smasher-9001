import Phaser from 'phaser'
import API from "../api"

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super('game-over-scene')
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser3-logo.png')
    this.load.image('hs3-logo', 'assets/img/hs3-logo.png')
  }

  async create(data) {
    const pts = data.points || 0
    const lvl = data.level || 0
    const shts = data.shoots || 0
    const time = Math.ceil(data.elapsedTime || 0)
    let rank = 0

    if (window.myStuff.token) {
      const response = await API.record(pts, shts, time)
      rank = response.rank

      await window.updateTopList()
    }

    console.log("Show end screen with data:", data)

    this.add.image(250, 550, 'phaser-logo').setScale(0.5)
    this.add.image(550, 550, 'hs3-logo').setScale(0.5)

    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      "KONIEC GRY", {
      font: '64px Verdana',
    }).setOrigin(0.5, 0.5)

    const lines: string[] = []
    if (rank) { lines.push("Miejsce w rankingu: #" + rank) }
    lines.push("Punkty: " + pts)
    lines.push("Poziom: " + lvl)
    lines.push("Czas Gry: " + time + 's')

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
      lines,
      {
        font: '32px Verdana',
        align: 'center',
        color: 'cyan'
      }).setOrigin(0.5, 0.5)

    window.unfreezeGui()
  }
}
