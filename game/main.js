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
	'jaysexy.png',
	'jayangry.png'
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

	var preload = function() {
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		KWA.IMAGES.forEach(function(filename) {
			var index = filename.split(".")[0].replace(/(\/|\\)/g, ''); // collapse whole path into a no-slash string
			this.load.image(index, KWA.IMAGE_DIR + filename);
		}, this);
		KWA.SHEETS.forEach(function(sheet) {
			var index = sheet[0].split(".")[0].replace(/(\/|\\)/g, '');
			this.load.spritesheet(index, KWA.IMAGE_DIR + sheet[0], sheet[1], sheet[2], sheet[3]);
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
	};

	createText = function() {
		if (!canCreateText) {
			game.time.events.add(Phaser.Timer.SECOND, createText, game);
			return;
		}

		var text = this.add.text(this.world.centerX, this.world.height - 90, "Click or tap to start!", {font:"50px Droid Sans Mono", fill: "#000", align: "center"});
        text.anchor.setTo(0.5);
        var star1 = this.add.sprite(38, this.world.height - 90, 'star');
        star1.anchor.setTo(0.5);
        this.add.tween(star1)
            .to({angle: 180}, 1500, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
        this.add.tween(star1.scale)
            .to({x: 2, y: 2}, 600, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
        var star2 = this.add.sprite(762, this.world.height - 90, 'star');
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