var preloader = {preload:preload, create: create}

function preload() {
    // load tileset image
    game.load.image('tileset', 'assets/images/kongtiles.bmp');
    
    // load player tile image
    game.load.image('player', 'assets/images/player.bmp');
    
    // load tilemap data
    game.load.tilemap('tilemap', 'assets/data/test1.json', null, Phaser.Tilemap.TILED_JSON);
    
    // set scale mode
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}

function create() {
    game.state.start('manuState', true, false, {mode:"init"});
}