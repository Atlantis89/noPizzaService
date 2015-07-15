var preloader = function(game) {

};


preloader.prototype = {
  preload: function() {
    this.game.load.image('rot', 'assets/rot.png');
    this.game.load.image('gruen', 'assets/gruen.png');
    this.game.load.image('blau', 'assets/blau.png');
    this.game.load.image('player', 'assets/player.png');
    this.game.load.image('target', 'assets/target.png');
    this.game.load.image('mapTilesTest', 'assets/mapTilesTest.png');
    this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

    key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  create: function() {
    this.game.state.start('world');
  }
};
 
