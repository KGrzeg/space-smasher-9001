import Phaser from 'phaser'

import PlayScene from './scenes/PlayScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,

	width: 800,
	height: 600,

	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [PlayScene]
}

export default new Phaser.Game(config)
