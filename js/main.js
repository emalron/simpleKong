var game = new Phaser.Game(320, 600, Phaser.Auto);

game.state.add('gameState', gameState);
game.state.start('gameState');