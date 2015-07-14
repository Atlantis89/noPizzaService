var rot = function(game){
    console.log("bin in rot");
};


rot.prototype = {
    create: function(){
        this.background = this.game.add.sprite(0,0, 'rot');
    },
    update: function(){
        console.log(this.background);
        if(key.isDown){
            this.game.state.start('Gruen');
        }
    }
}