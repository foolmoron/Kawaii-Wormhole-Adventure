window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'wormhole', { preload: preload, create: create });

    window.WebFontConfig = {
        active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
        google: {
          families: ['Droid Sans Mono']
        }
    };

    function preload() {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }

    function create() {
        game.stage.setBackgroundColor('#0E3DA9');
    }

    function createText() {
        var text = game.add.text(game.world.centerX, game.world.centerY, "aaa\nbbb\nccc\nяяя\nβββ", {font:"50px Droid Sans Mono", fill: "#fff", align: "center"});
        text.anchor.setTo(0.5);
    }
};