var rot = function(game) {
  console.log("bin in rot");
};


rot.prototype = {
  create: function() {
    this.SPEED=100;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap('map');

    this.map.addTilesetImage('mapTilesTest');

    // map.setCollisionBetween(1, 12);
    this.layers = {}
    this.layers.ground = this.map.createLayer('walkable');

    this.layers.buildings = this.map.createLayer('buildings');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100 * 100, true, 'buildings');
    this.layers.ground.resizeWorld();
    //create player

    //we know there is just one result
    this.player = this.game.add.sprite(80, 80, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();


    targets = this.findObjectsByType('target', this.map, 'objects');
    target = targets[Math.floor(Math.random() * targets.length)];
    console.log(targets)
    target.sprite = this.game.add.sprite(target.x, target.y, 'target');

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.layers.buildings);
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= this.SPEED;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += this.SPEED;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= this.SPEED;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += this.SPEED;
    }
    if (key.isDown) {
      this.game.state.start('Gruen');
    }
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    console.log(map)
    var result = new Array();
    map.objects[layer].forEach(function(element){
      console.log(element)
      if(element.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  }
}
