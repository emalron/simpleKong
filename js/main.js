var game = new Phaser.Game(320, 600, Phaser.Auto);

game.state.add('gameState', gameState);
game.state.add('manuState', manuState);
game.state.add('preloader', preloader);
game.state.start('preloader');