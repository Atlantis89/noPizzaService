window.onload = function(){
    //define gamestates
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    game.state.add('Blau', blau);
    game.state.add('Rot', rot);
    game.state.add('Gruen', gruen);
    game.state.add('Preloader', preloader);

    game.state.start('Preloader');
};

