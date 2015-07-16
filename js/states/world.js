var world = function (game) {
    console.log("bin in rot");
};


world.prototype = {
    create: function () {
        this.SPEED = 100;
        this.pizzas = 0;
        this.cooldowns = [];
        this.cooldowns['take'] = 0;
        this.cooldowns['give'] = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.game.add.tilemap('map');

        this.map.addTilesetImage('mapTilesTest');

        // map.setCollisionBetween(1, 12);
        this.layers = {};
        this.layers.ground = this.map.createLayer('walkable');

        this.layers.buildings = this.map.createLayer('buildings');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 100 * 100, true, 'buildings');
        this.layers.ground.resizeWorld();
        //create player

        //we know there is just one result
        this.player = this.game.add.sprite(80, 80, 'player');
        this.player.anchor.setTo(0.5,0.5);
        this.game.physics.arcade.enable(this.player);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // get target
        this.targets = this.findObjectsByType('target', this.map, 'objects');
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].sprite = this.game.add.sprite(this.targets[i].x, this.targets[i].y, 'target');
            this.targets[i].cooldown = 0;
        }

        //pizzashop
        this.pizzashop = this.findObjectsByType('pizzaria', this.map, 'objects')[0];

        this.createUnits();
    },
    update: function () {
        var dt = this.game.time.elapsed;
        for (var id in this.cooldowns) {
            this.cooldowns[id] += dt;
        }
        this.game.physics.arcade.collide(this.player, this.layers.buildings);
        //player movement
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= this.SPEED;
            this.player.angle = 0;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += this.SPEED;
            this.player.angle = 180;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= this.SPEED;
            this.player.angle = -90;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += this.SPEED;
            this.player.angle = 90;
        }
        if (key.isDown) {
            this.game.state.start('Gruen');
        }
        if (keys.take.isDown && this.cooldowns['take'] >= 0 && Phaser.Point.distance(this.player, this.pizzashop) < 20) {
            this.pizzas += 1;
            this.cooldowns['take'] = -1000;
            console.log(this.pizzas);
        }

        //update targets
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].cooldown += dt;
            this.targets[i].sprite.visible = this.targets[i].cooldown >= 0;
            //console.log(Phaser.Point.distance(this.player,this.targets[i]));
            if (this.targets[i].cooldown >= 0 && Phaser.Point.distance(this.player, this.targets[i]) < 20 && this.pizzas > 0) {
                this.pizzas -= 1;
                this.targets[i].cooldown = -15000;
                console.log(this.pizzas);
            }
        }
    },
    render: function(){
        this.game.debug.spriteInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        console.log(map);
        var result = [];
        map.objects[layer].forEach(function (element) {
            console.log(element);
            if (element.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    createUnits:function (){

        this.createPolice();
    }
    ,
    createPolice:function () {
        this.police=[]
        this.police = this.findObjectsByType('police', this.map, 'objects');
        for (var i = 0; i < this.police.length; i++) {
            this.police[i].sprite = this.game.add.sprite(this.police[i].x, this.police[i].y, 'police');
            this.game.physics.arcade.enable(this.police[i].sprite);
            this.game.physics.arcade.collide(this.police[i].sprite, this.layers.buildings);
             this.game.physics.arcade.moveToPointer(this.police[i].sprite,100,{x:(this.police[i].x/32)*32,y: (this.police[i].y/32)*32});
              this.game.physics.arcade.moveToPointer(this.police[i].sprite,100,0);
        }

    }
}
