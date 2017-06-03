var wfconfig = {
 
    active: function() { 
        init();
    },
 
    google: {
        families: ['Barrio']
    }
 
};
 
WebFont.load(wfconfig);

var init = function() {
	var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

	var title = {

		preload : function() {
			game.load.image('background', 'images/background1.png');
			game.load.image('invisibleWall', 'images/invisible_wall.png');
			game.load.image('ground', 'images/ground.png');
			game.load.image('grass4', 'images/grass_4x1.png');
			game.load.image('grass2', 'images/grass_2x1.png');
			game.load.image('grass1', 'images/grass_1x1.png');
			game.load.image('ufo', 'images/ufo.png');
			game.load.spritesheet('guy', 'images/guy.png', 16, 24, 16);
			game.load.image('apple', 'images/apple.png');
			game.load.image('banana', 'images/banana.png');
			game.load.image('lemon', 'images/lemon.png');
			game.load.image('orange', 'images/orange.png');
			game.load.image('pear', 'images/pear.png');
			game.load.image('strawberry', 'images/strawberry.png');
		},

		create : function() {
			game.add.text(130, 150, 'UFO Fruit Salad \n\nPress space to begin', { font : 'Barrio', fontSize: '40px', fill: '#fff' });
			controls = game.input.keyboard.addKeys({
		    	left : Phaser.KeyCode.LEFT,
		    	right : Phaser.KeyCode.RIGHT,
		    	space : Phaser.KeyCode.SPACEBAR
		    });
		},
		update : function() {
			if (controls.space.isDown) {
				console.log('button pressed!');
				game.state.start('GameState');
			}
		}
	};

	var platforms,
		player,
		controls,
		invisibleWalls,
		enemies,
		fruit,
		scoreText;
	var score = 0;
	var timer = 0;
	var fruitCounter = 0;
	var stateText = "Welcome! \nPress space to begin!";

	function UFO(x, y) {
		var ufo = game.add.sprite(x, y, 'ufo');
		ufo.scale.setTo(0.05);
		ufo.anchor.setTo(0.5);
		game.physics.arcade.enable(ufo);
		ufo.body.gravity.y = 800;
		ufo.body.collideWorldBounds = true;
		game.physics.arcade.enable(ufo);
		ufo.body.velocity.x = -50;
		return ufo;
	}

	function GenerateInvisibleWall(x, y) {
		var wall = game.add.sprite(x, y, 'invisibleWall');
		return wall;
	}

	function MakeFruit() {
		var fruitArray = ['apple',
		'banana',
		'lemon',
		'orange',
		'pear',
		'strawberry']
		// Randomly select a fruit from array and place at top of screen with random assigned x position
		var fruit = game.add.sprite(Math.floor((Math.random() * 620) + 1), 0, fruitArray[Math.floor(Math.random() * 5)]);
		fruit.scale.setTo(0.07);
		game.physics.arcade.enable(fruit);
		fruit.body.gravity.y = 80;
		timer = game.time.now + 1500;
		return fruit;
	}

	function checkCollisions() {
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(enemies, platforms);
		game.physics.arcade.collide(enemies, invisibleWalls);
		game.physics.arcade.collide(fruit, platforms, function(fruit, platforms) {
			fruit.kill();
		})
	}

	function playerTouchingFruit() {
		game.physics.arcade.overlap(player, fruit, function(player, fruit) {
			fruit.kill();
			updateScore();
		})
	}

	function updateScore() {
		score++;
		scoreText.text = "Score: " + score;
	}

	function playerTouchingEnemy() {
		game.physics.arcade.overlap(player, enemies, function(player, enemies) {
			game.state.restart();
		})
	}

	// Main gamestate
	var GameState = {

		create : function() {
			game.physics.startSystem(Phaser.Physics.ARCADE);

			// Adds background into game
			game.add.image(0, 0, 'background');



			// Add score
			scoreText = game.add.text(16, 16, 'Score: 0', { font : 'Barrio', fontSize: '24px', fill: '#000' });

			platforms = game.add.group();
			platforms.enableBody = true;

			// Add ground
			ground = platforms.create(0, game.world.height - 30, 'ground');

			// Add platforms
			ledge = platforms.create(400, 350, 'grass2');

		    ledge = platforms.create(550, 250, 'grass2');

		    ledge = platforms.create(0, 250, 'grass2');

		    ledge = platforms.create(300, 140, 'grass1');

		    ledge = platforms.create(0, 90, 'grass1');

		    ledge = platforms.create(150, 90, 'grass1');

		    ledge = platforms.create(180, 350, 'grass2');

		    ledge = platforms.create(500, 80, 'grass1');

		    ledge = platforms.create(235, 250, 'grass4');

		    platforms.forEach(function(platform) {
		    	platform.body.immovable = true;
		    })

		    // Add invisible walls to keep enemies on platforms
		    invisibleWalls = game.add.group();
		    invisibleWalls.enableBody = true;

		    invisibleWalls.add(GenerateInvisibleWall(220, 220));
		    invisibleWalls.add(GenerateInvisibleWall(403, 220));
		    
		    invisibleWalls.add(GenerateInvisibleWall(385, 325));
		    invisibleWalls.add(GenerateInvisibleWall(485, 325));

		    invisibleWalls.add(GenerateInvisibleWall(165, 325));
		    invisibleWalls.add(GenerateInvisibleWall(265, 325));

		    invisibleWalls.add(GenerateInvisibleWall(85, 220));

		    invisibleWalls.add(GenerateInvisibleWall(535, 220));

		    invisibleWalls.forEach(function(wall) {
		    	wall.body.immovable = true;
		    	wall.visible = false;
		    })

		    // Add the player
		    player = game.add.sprite(32, 426, 'guy');

		    //  We need to enable physics on the player
		    game.physics.arcade.enable(player);

		    //  Player physics properties
		    player.body.gravity.y = 380;
		    player.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		    player.animations.add('left', [8, 9, 10, 11], 10, true);
		    player.animations.add('right', [4, 5, 6, 7], 10, true);
		    player.animations.add('jump', [1], 1, true);
		    player.animations.add('jumpLeft', [9], 1, true);
		    player.animations.add('jumpRight', [5], 1, true);

		    // Make a group to hold all of the enemies
		    enemies = game.add.group();

		    // Add enemies. Hoping to move this to a JSON file at some point
		    enemies.add(UFO(266, 230));
		    enemies.add(UFO(220, 330));
		    enemies.add(UFO(450, 330));
		    enemies.add(UFO(497, 430));
		    enemies.add(UFO(0, 223));
		    enemies.add(UFO(620, 223));

		    // Make a group to hold all of the fruit
		    fruit = game.add.group();

		    // Get control keys
		    controls = game.input.keyboard.addKeys({
		    	left : Phaser.KeyCode.LEFT,
		    	right : Phaser.KeyCode.RIGHT,
		    	space : Phaser.KeyCode.SPACEBAR
		    })

			},
			update : function() {
				//  Check for collisions between all sprites
				checkCollisions();
			    //  Reset the players velocity (movement)
			    player.body.velocity.x = 0;

			    // Check to see if fruit collides with player
			    playerTouchingFruit();
			    playerTouchingEnemy();

			    // Make the enemies move!
			    enemies.forEach(function(enemy) {
			    	if (enemy.body.touching.right || enemy.body.blocked.right) {
			    		enemy.body.velocity.x = -50;
			    		enemy.scale.x *= -1;
			    	}
			    	else if (enemy.body.touching.left || enemy.body.blocked.left) {
			    		enemy.body.velocity.x = 50;
			    		enemy.scale.x *= -1;
			    	}
			    })

			    // Generate fruit
			    if (timer < game.time.now) {
			    	fruit.add(MakeFruit());
			    }

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

			        player.frame = 0;
			    }

			    if (controls.space.isDown && player.body.touching.down) {
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
	game.state.add('Title', title);
	game.state.add('GameState', GameState);
	game.state.start('Title');	
}