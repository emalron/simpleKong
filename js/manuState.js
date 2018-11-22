var manuState = {init:init, create:create, update: update};

var mode = "";

function init(params) {
    mode = params.mode;
}

function create() {
    if(mode="init") {
        // say hello
        var style = {font: "24px Arial", fill:"#FFF"}
        var msg = game.add.text(game.world.centerX, game.world.centerY, "Press SPACEBAR to start", style);
        msg.anchor.setTo(.5);
        
        // make event listener
        game.manuEvent = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    else if (mode == "dead") {
        
    }
}

function update() {
    if(game.manuEvent.isDown && mode == "init") {
        game.state.start('gameState', true, false);
    }
}