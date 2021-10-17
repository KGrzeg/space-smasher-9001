import Phaser, { Game } from 'phaser'

import PlayScene from './scenes/PlayScene'
import GameOverScene from './scenes/GameOverScene'

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
	scene: [PlayScene, GameOverScene]
}

export default new Phaser.Game(config)
