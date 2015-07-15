var rot = function(game){
    console.log("bin in rot");
};


rot.prototype = {
    create: function(){
        this.background = this.game.add.sprite(0,0, 'rot');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    map = this.game.add.tilemap('map');

    map.addTilesetImage('mapTilesTest');

    // map.setCollisionBetween(1, 12);

    layer = map.createLayer('walkable');

    layer.resizeWorld();
    },
    update: function(){
        console.log(this.background);
        if(key.isDown){
            this.game.state.start('Gruen');
        }
    }
}
