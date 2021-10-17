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
      130,
      "SPACE SMASHER\n9001!", {
      font: '64px Verdana',
      align: "center"
    }).setOrigin(0.5, 0.5)

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, [
      "Zaloguj się przed rozpoczęciem gry",
      "za pomocą panelu na górze, aby zdobywać rekord.",
      "",
      "Możesz też zagrać jako gość (bez rankingu)."
    ], {
      font: '21px Verdana',
      align: 'center',
      color: 'cyan'
    }).setOrigin(0.5, 0.5)

    this.add.text(this.cameras.main.centerX, 450,
      "Kliknij aby zacząć grę",
      {
        font: '32px Verdana',
        align: 'center',
        color: 'yellow'
      }).setOrigin(0.5, 0.5)

    this.input.on('pointerup', () => {
      window.freezeGui()
      this.scene.start('play-scene');
    });
  }
}
