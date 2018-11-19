var gameState = {init: init, preload:preload, create:create, update:update}

function init() {
    let g = game;
    
    g.scale.ScaleMode = Phaser.ScaleManager.SHOW_ALL;
    g.scale.pageAlignVertically = true;
    g.scale.pageAlignHorizontally = true;
    
    g.world.setBounds(0,0,320,1600);
    
    g.stage.backgroundColor = '#FFF'
    
    g.wasd = {
        up: g.input.keyboard.addKey(Phaser.Keyboard.W),
        left: g.input.keyboard.addKey(Phaser.Keyboard.A),
        down: g.input.keyboard.addKey(Phaser.Keyboard.S),
        right: g.input.keyboard.addKey(Phaser.Keyboard.D)
    }
    
    g.setting = {
        gravity: 500,
        jump_speed: 250,
        move_speed: 120
    }
}


function preload() {
    let g = game;
    
    g.load.image('tiles', 'assets/images/kongtiles.bmp');
    g.load.image('player', 'assets/images/player.bmp')
    g.load.tilemap('test', 'assets/data/test1.json', null, Phaser.Tilemap.TILED_JSON);
    
    g.physics.startSystem(Phaser.Physics.ARCADE);
    g.physics.arcade.gravity.y = g.setting.gravity;
    
}

function create() {
    let g = game;
    
    g.map = g.add.tilemap('test');
    g.map.addTilesetImage('kongtiles', 'tiles');
    g.platforms = g.map.createLayer('platforms');
    g.platforms.resizeWorld();
    
    g.fires = g.map.createLayer('fires');
    g.fires.resizeWorld();
    
    g.coins = g.add.group();
    
    g.map.createFromObjects('coins', 3, 'coin', 0, true, false, g.coins);
    
    g.map.setCollisionBetween(1,4,'platform');
    g.map.setCollisionBetween(1,4,'fires');
    
    g.player = g.add.sprite(16, 1538, 'player');
    
    g.states = {0: "normal", 1:"jumping"};
    g.player.states = g.states[0];
    
    setPhysics();
    
    g.camera.follow(g.player);
    
    g.ninjaTimer = g.time.create(false);
    g.ninjaTimer.start();
    
    console.log(g.map.objects);
}

function update() {
    updateInit();
    input();
    
    if(game.ninjaTimer.elapse >= 500) {
        console.log('stop')
        game.ninjaTimer.pause();
    }
    
}

function updateInit() {
    let g = game;
    
    if(g.player.states == g.states[0]) {
        g.player.body.velocity.x = 0;
    }
    // g.player.body.velocity.y = 0;
    
    g.physics.arcade.collide(g.player, g.platforms);
}

function input() {
    let g = game;
    
    if(g.player.states == g.states[0]) {
        if(g.wasd.right.isDown) {
        console.log('move to right');
        movePlayer(g.setting.move_speed, 0);
    }
    else if (g.wasd.left.isDown) {
        console.log('move to left');
        movePlayer(-g.setting.move_speed, 0);
    }
    }
    if(g.player.body.blocked.down) {
        g.player.states = g.states[0];
        console.log('jump');
        movePlayer(0, -g.setting.jump_speed);
    }
    else if(g.player.states == g.states[0] && (g.player.body.blocked.right || g.player.body.blocked.left)) {
        g.player.states = g.states[1];
        console.log('ninja!')
        
        if(g.player.body.blocked.right && g.wasd.left.isDown) {
            console.log('ninja jump to left');
            g.player.body.velocity.x = 0;
            g.player.body.velocity.y = 0;
            movePlayer(-g.setting.move_speed, -g.setting.jump_speed);
        }
        else if(g.player.body.blocked.left && g.wasd.right.isDown) {
            
            console.log('ninja jump to right');
            g.player.body.velocity.x = 0;
            g.player.body.velocity.y = 0;
            movePlayer(g.setting.move_speed, -g.setting.jump_speed);
        }
    }
}

function movePlayer(vx, vy) {
    let g = game;
    
    g.player.body.velocity.x += vx;
    g.player.body.velocity.y += vy;
}

function setPhysics() {
    let g = game;
    
    g.physics.enable(g.player);
    g.physics.enable(g.platforms);
    
    g.player.body.allowGravity = true;
    g.player.body.collideWorldBounds=true;
}