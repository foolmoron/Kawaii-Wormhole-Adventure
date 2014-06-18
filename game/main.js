var KWA = window.KWA = window.KWA || {};

KWA.IMAGE_DIR = 'img/';
KWA.IMAGES = [
    'startscreen.png',
    'star.png',
    'dialoguebox.png',
    'namebox.png',
    'advancearrow.png',
    'fastforwardarrow.png',
    'questionmark.png',
    'blank.png',
    'bgstarry.png',
    'bgroom.png',
    'bgmanor.png',
    'bgmoon.png',
    'maynormal.png',
    'mayhappy.png',
    'maysad.png',
    'maysexy.png',
    'mayangry.png',
    'jaynormal.png',
    'jayhappy.png',
    'jaysad.png',
    'jaysexy.png'
];
KWA.SHEETS = [
    ['choicebox.png', 600, 40, 3]
];

window.onload = function() {
    var game,
        createText,
        canCreateText = false,
        canStart = false
        ;

        KWA.STATES.preloader = {
            preload: function() {
                var loadingText = this.add.text(this.world.centerX, this.world.centerY, "Loading...", {font:"50px Arial", fill: "#fff", align: "center"});
                loadingText.anchor.setTo(0.5);

                this.preloadBar = this.add.sprite(400, 400, 'preloadBar');
                this.preloadBar.anchor.setTo(0.5);

                this.load.setPreloadSprite(this.preloadBar);

                KWA.IMAGES.forEach(function(filename) {
                    var index = filename.split(".")[0].replace(/(\/|\\)/g, ''); // collapse whole path into a no-slash string
                    this.load.image(index, KWA.IMAGE_DIR + filename);
                }, this);
                KWA.SHEETS.forEach(function(sheet) {
                    var index = sheet[0].split(".")[0].replace(/(\/|\\)/g, '');
                    this.load.spritesheet(index, KWA.IMAGE_DIR + sheet[0], sheet[1], sheet[2], sheet[3]);
                }, this);
                game.load.audio('main', 'audio/maintheme.mp3');
                game.load.audio('generic', 'audio/generictheme.mp3');
                game.load.audio('may', 'audio/maytheme.mp3');
                game.load.audio('jay', 'audio/jaytheme.mp3');
            },
            create: function() {
                this.preloadBar.cropEnabled = false;
            },
            update: function() {
                if ((!this.cache._sounds['main'].data.length) || // data is null in firefox for some reason... so just ignore sound and load the start menu
                    (this.cache.isSoundDecoded('main') && !this.ready)) {
                    this.ready = true;
                    this.state.start('startmenu');
                }
            }
        };

        KWA.STATES.startmenu = {
            preload: function() {
                this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            },
            create:function () {
                var music = game.add.audio('main', 1, true);
                music.play();

                var startscreen = this.add.button(0, 0, 'startscreen', function() {  
                    if (canStart) {
                        canStart = false;
                        KWA.fn.call(this, 'fadeOut', {
                            duration: 1000,
                            onComplete: function() {
                                music.stop();
                                this.state.start('datingsim', true, false, KWA.SCRIPT);
                            }
                        });
                    }
                }, this);

                var star1 = this.add.sprite(38, 320, 'star');
                star1.anchor.setTo(0.5);
                this.add.tween(star1)
                    .to({angle: 180}, 1500, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
                this.add.tween(star1.scale)
                    .to({x: 2, y: 2}, 600, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
                var star2 = this.add.sprite(762, 320, 'star');

                star2.anchor.setTo(0.5);
                star2.angle = 180;
                this.add.tween(star2)
                    .from({angle: 0}, 1500, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
                this.add.tween(star2.scale)
                    .to({x: 2, y: 2}, 600, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
                
                canCreateText = true;
            }
        };

    var preload = function() { 
        this.load.image('preloadBar', 'img/preloadBar.png'); 
    };

    var create = function() {
        this.input.maxPointers = 1;
        this.stage.setBackgroundColor('#000');
        this.state.start('preloader');
    };

    createText = function() {
        if (!canCreateText) {
            game.time.events.add(Phaser.Timer.SECOND, createText, game);
            return;
        }

        var text = this.add.text(this.world.centerX, this.world.height - 110, "Click or tap to start!", {font:"50px Droid Sans Mono", fill: "#000", align: "center"});
        text.anchor.setTo(0.5);

        var star1 = this.add.sprite(38, this.world.height - 110, 'star');
        star1.anchor.setTo(0.5);
        this.add.tween(star1)
            .to({angle: 180}, 1500, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
        this.add.tween(star1.scale)
            .to({x: 2, y: 2}, 600, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

        var star2 = this.add.sprite(762, this.world.height - 110, 'star');
        star2.anchor.setTo(0.5);
        star2.angle = 180;
        this.add.tween(star2)
            .from({angle: 0}, 1500, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
        this.add.tween(star2.scale)
            .to({x: 2, y: 2}, 600, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

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