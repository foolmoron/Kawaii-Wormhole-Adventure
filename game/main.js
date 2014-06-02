var KWA = window.KWA = window.KWA || {};

KWA.IMAGE_DIR = 'img/';
KWA.IMAGES = [
    'startscreen.png',
    'dialoguebox.png',
    'namebox.png',
    'advancearrow.png',
    'blank.png',
    'background1.png',
    'background2.png',
    'background3.png',
    'background4.png',
    'may1.png',
    'may2.png',
    'may3.png',
    'jay1.png',
    'jay2.png',
    'jay3.png'
];

window.onload = function() {
    var game,
        createText,
        canCreateText = false,
        canStart = false
        ;

    var preload = function() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        KWA.IMAGES.forEach(function(filename) {
            var index = filename.split(".")[0].replace(/(\/|\\)/g, ''); // collapse whole path into a no-slash string
            this.load.image(index, KWA.IMAGE_DIR + filename);
        }, this);
    };

    var create = function() {
        this.stage.setBackgroundColor('#0E3DA9');

        var startscreen = this.add.button(0, 0, 'startscreen', function() {  
            if (canStart) {
                canStart = false;
                KWA.fn.call(this, 'fadeOut', {
                    duration: 1000,
                    onComplete: function() {
                        this.state.start('datingsim', true, false, KWA.SCRIPT);
                    }
                });
            }
        }, this);

        canCreateText = true;
    };

    createText = function() {
        if (!canCreateText) {
            game.time.events.add(Phaser.Timer.SECOND, createText, game);
            return;
        }

        var text = this.add.text(this.world.centerX, this.world.height - 10, "click to start", {font:"50px Droid Sans Mono", fill: "#000", align: "center"});
        text.anchor.setTo(0.5, 1);

        canStart = true;
    };

    window.WebFontConfig = {
        active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, game); },
        google: { families: ['Droid Sans Mono'] }
    };

    game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create }, false, false);

    var states = Object.keys(KWA.STATES);
    for (var i = 0; i < states.length; i++) {
        game.state.add(states[i], KWA.STATES[states[i]]);
    }
};