import Phaser from 'phaser'

export default class StartScene extends Phaser.Scene {

  constructor() {
    super('start-scene')
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser3-logo.png')
    this.load.image('hs3-logo', 'assets/img/hs3-logo.png')
  }

  create() {
    this.add.image(250, 550, 'phaser-logo').setScale(0.5)
    this.add.image(550, 550, 'hs3-logo').setScale(0.5)

    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      "SPACE SMASHER 9001!", {
      font: '64px Verdana',
    }).setOrigin(0.5, 0.5)

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, [
      "Naciśnij przycisk aby zacząć",
      "",
      "Zaloguj się przed rozpoczęciem gry, aby zachować rekord",
      "albo graj jako gość (bez rankingu)"
    ], {
      font: '21px Verdana',
      align: 'center',
      color: 'cyan'
    }).setOrigin(0.5, 0.5)

    this.input.on('pointerup', () => {
      this.scene.start('play-scene', window.myStuff);
    });
  }
}
