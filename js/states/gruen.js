var gruen = function(game){
    console.log("bin in gruen");
};


gruen.prototype = {
    create: function(){
        this.background = this.game.add.sprite(0,0, 'gruen');
    },
    update: function(){
        console.log(this.background);
        if(key.isDown){
            this.game.state.start('Blau');
        }
    }
}