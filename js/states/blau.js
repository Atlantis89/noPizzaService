var blau = function(game){
    console.log("bin in blau");
};


blau.prototype = {
    create: function(){
        this.background = this.game.add.sprite(0,0, 'blau');
    },
    update: function(){
        console.log(this.background);
        if(key.isDown){
            this.game.state.start('Rot');
        }
    }
}