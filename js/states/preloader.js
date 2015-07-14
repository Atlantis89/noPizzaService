var preloader = function(game){

};


preloader.prototype = {
    preload:function(){
        this.game.load.image('rot', 'assets/rot.png');
        this.game.load.image('gruen', 'assets/gruen.png');
        this.game.load.image('blau', 'assets/blau.png');

        key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    create: function(){
        this.game.state.start('Rot');
    }
};