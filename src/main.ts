import Phaser from 'phaser'

import DefaultScene from './scenes/DefaultScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,

	width: 800,
	height: 600,

	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	},
	scene: [DefaultScene]
}

export default new Phaser.Game(config)
