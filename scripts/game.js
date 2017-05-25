var game = new Phaser.Game(640, 480, '', Phaser.AUTO);
var platforms,
	player,
	controls,
	hitPlatform;

var GameState = {
	preload : function() {
		game.load.image('background', 'images/background1.png');
		game.load.image('ground', 'images/ground.png');
		game.load.image('grass6', 'images/grass_6x1.png');
		game.load.image('grass4', 'images/grass_4x1.png');
		game.load.image('grass2', 'images/grass_2x1.png');
		game.load.image('grass1', 'images/grass_1x1.png');
		game.load.spritesheet('guy', 'images/guy.png', 16, 24, 16);
	},
	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adds background into game
		game.add.image(0, 0, 'background');

		platforms = game.add.group();
		platforms.enableBody = true;

		// Add ground
		ground = platforms.create(0, game.world.height - 30, 'ground');

		ground.body.immovable = true;
		// Add platforms
		ledge = platforms.create(400, 350, 'grass2');

	    ledge.body.immovable = true;

	    ledge = platforms.create(500, 240, 'grass2');

	    ledge.body.immovable = true;

	    ledge = platforms.create(0, 250, 'grass4');

	    ledge.body.immovable = true;

	    // Add the player
	    player = game.add.sprite(32, game.world.height - 60, 'guy');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.gravity.y = 380;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [8, 9, 10, 11], 10, true);
	    player.animations.add('right', [4, 5, 6, 7], 10, true);
	    player.animations.add('jump', [1], 1, true);
	    player.animations.add('jumpLeft', [9], 1, true);
	    player.animations.add('jumpRight', [5], 1, true);

	    controls = game.input.keyboard.addKeys({
	    	left : Phaser.KeyCode.LEFT,
	    	right : Phaser.KeyCode.RIGHT,
	    	space : Phaser.KeyCode.SPACEBAR
	    })

		},
		update : function() {
			//  Collide the player and the stars with the platforms
   			hitPlatform = game.physics.arcade.collide(player, platforms);

		    //  Reset the players velocity (movement)
		    player.body.velocity.x = 0;

		    if (controls.left.isDown) {
		        //  Move to the left
		        player.body.velocity.x = -200;

		        player.animations.play('left');
		    }
		    else if (controls.right.isDown) {
		        //  Move to the right
		        player.body.velocity.x = 200;

		        player.animations.play('right');
		    }
		    else {
		        //  Stand still
		        player.animations.stop();

		        player.frame = 4;
		    }

		    if (controls.space.isDown && player.body.touching.down && hitPlatform) {
		        player.body.velocity.y = -300;
		    }

		    if (player.body.velocity.x < 0 && !player.body.touching.down) {
		        	player.animations.play('jumpLeft');
	        }
	        else if (player.body.velocity.x > 0 && !player.body.touching.down) {
	        	player.animations.play('jumpRight');
	        }
	        else if (player.body.velocity.x === 0 && !player.body.touching.down) {
	        	player.animations.play('jump');
	        }
}
};

game.state.add('GameState', GameState);
game.state.start('GameState');