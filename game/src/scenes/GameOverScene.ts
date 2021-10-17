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
    console.log("Show end screen with data:", data)

    this.add.image(250, 550, 'phaser-logo').setScale(0.5)
    this.add.image(550, 550, 'hs3-logo').setScale(0.5)

    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      "KONIEC GRY", {
      font: '64px Verdana',
    }).setOrigin(0.5, 0.5)

    const rank = 0
    const pts = data.points || 0
    const lvl = data.level || 0
    const shts = data.shoots || 0
    const time = Math.ceil(data.elapsedTime || 0)

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, [
      "Miejsce w rankingu: #" + rank,
      "Punkty: " + pts,
      "Poziom: " + lvl,
      "Czas Gry: " + time + 's',
    ], {
      font: '32px Verdana',
      align: 'center',
      color: 'cyan'
    }).setOrigin(0.5, 0.5)

    if (window.myStuff.token) {
      await API.record(pts, shts, time)
      await window.updateTopList()
    }
    window.unfreezeGui()
  }
}
