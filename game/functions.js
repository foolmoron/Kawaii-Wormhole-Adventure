var KWA = window.KWA = window.KWA || {};

KWA.fn = KWA.fn || {};
_.extend(KWA.fn, {
	call: function(stateContext, functionName, options) {
		this[functionName].call(stateContext, options || {});
	},

	_cleanupFunctions: [],
	cleanupEffects: function() {
		for (var i = 0; i < this._cleanupFunctions.length; i++) {
			this._cleanupFunctions[i]();
		}
		this._cleanupFunctions = [];
	},

	acquireCourage: function() {
		localStorage.setItem('courage', true);
	},

	acquireOptimism: function() {
		localStorage.setItem('optimism', true);
	},

	getAndSaveInputString: function(options) {
		options = _.extend({
			variableContainer: KWA,
			variableName: 'input',
			maxLength: 11,
			textOptions: {
				font: '32px Droid Sans Mono',
				fill: '#fff',
				align: 'center'
			}
		}, options);
		var self = this;

		this.mode = this.INPUT_MODE.ADVANCING;
		this.advanceText();
		this.mode = this.INPUT_MODE.STOPPED;
		this.keyInputEnabled = false;

		var inputText = this.add.text(this.world.centerX, this.world.centerY, "Type your name and press enter.", options.textOptions);
		inputText.anchor.setTo(0.5);
		var actualText = "";

		var inputHandler = function(evt) {
			if (evt.keyCode == 13) {
				self.mode = self.INPUT_MODE.WAITING;
				self.advanceText();
			} else if (actualText.length < options.maxLength) {
				actualText += String.fromCharCode(evt.keyCode);
				inputText.text = actualText;
			}
			return false;
		};
        window.addEventListener('keypress', inputHandler, false);

        //mobile specific handling
        if (!this.game.device.desktop) {
        	setTimeout(function() {
	        	var name = null;
	        	while (!name) {
	        		name = prompt("Type your name.");
	        	}
	        	name = name.substring(0, options.maxLength);
				actualText = name;
				inputText.text = actualText;
				self.mode = self.INPUT_MODE.WAITING;
				self.advanceText();
        	}, 500);
        }

		KWA.fn._cleanupFunctions.push(function() {
        	window.removeEventListener('keypress', inputHandler, false);
        	options.variableContainer[options.variableName] = actualText.trim();
        	inputText.destroy();
			self.keyInputEnabled = true;
		});
	},

	fade: function(options) {
		options = _.extend({
			fadeOut: false,
			color: 0x000000,
			duration: 1000,
			easing: Phaser.Easing.Linear.None,
			onComplete: function() {}
		}, options);

		var fade = this.add.graphics(0, 0);
		fade.beginFill(options.color, 1);
		fade.drawRect(-this.game.width / 2, -this.game.height / 2, this.game.width * 2, this.game.height * 2);
		fade.alpha = (options.fadeOut) ? 0 : 1;
		fade.endFill();

		var tween = this.add.tween(fade)
			.to({alpha: (options.fadeOut) ? 1 : 0}, options.duration, options.easing, true);
		tween.onComplete.add(options.onComplete, this);

		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			fade.destroy();
		});
	},

	fadeOut: function(options) {
		options.fadeOut = true;
		KWA.fn.call(this, 'fade', options);
	},

	fadeIn: function(options) {
		options.fadeOut = false;
		KWA.fn.call(this, 'fade', options);
	},

	screenShake: function(options) {
		options = _.extend({
			magnitude: 20,
			duration: 750,
			easing: Phaser.Easing.Exponential.In,
			onComplete: function() {}
		}, options);

		var magnitudeObj = { magnitude: options.magnitude };
		var tween = this.add.tween(magnitudeObj)
			.to({magnitude: 0}, options.duration, options.easing, true)
			.onUpdateCallback(function(tween, value) {
				var magnitude = (1 - value) * options.magnitude; // 'value' is just raw interp value, so we have to manually calculate magnitude
				var randX = this.rnd.integerInRange(-magnitude, magnitude);
				var randY = this.rnd.integerInRange(-magnitude, magnitude);
				this.world.setBounds(randX, randY, this.game.width + randX, this.game.height + randY);
			}, this);

		var self = this;
		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			self.world.setBounds(0, 0, self.game.width, self.game.height);
		});
	},

	flashBackground: function(options) {
		options = _.extend({
			background: 'blank',
			duration: 400,
			easing: Phaser.Easing.Linear.None
		}, options);

		var newBackground = this.add.sprite(this.world.centerX, this.world.centerY, options.background);
		newBackground.anchor.setTo(0.5);
		newBackground.alpha = 0;
		var tween = this.add.tween(newBackground)
			.to({alpha: 1}, options.duration, options.easing, true, 0, 1, true);

		var self = this;
		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			newBackground.destroy();
		});
	},

	characterSlide: function(options) {
		options = _.extend({
			characterRight: true,
			slideIn: true,
			duration: 1000,
			easing: Phaser.Easing.Quartic.Out,
			onComplete: function() {}
		}, options);

		var character = (options.characterRight) ? this.characterRight : this.characterLeft;
		var originalX = character.x;
		var outsideScreenX = (options.characterRight) ? 925: -125; // 125 units off screen, matters greatly for easing
		character.x = (options.slideIn) ? outsideScreenX : originalX;
		var tween = this.add.tween(character)
			.to({x: (options.slideIn) ? originalX : outsideScreenX}, options.duration, options.easing, true);
		tween.onComplete.add(options.onComplete, this);

		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			character.x = originalX;
		});
	},

	characterRightSlideIn: function(options) {
		options.characterRight = true;
		options.slideIn = true;
		KWA.fn.call(this, 'characterSlide', options);
	},

	characterRightSlideOut: function(options) {
		options.characterRight = true;
		options.slideIn = false;
		KWA.fn.call(this, 'characterSlide', options);
	},

	characterLeftSlideIn: function(options) {
		options.characterRight = false;
		options.slideIn = true;
		KWA.fn.call(this, 'characterSlide', options);
	},

	characterLeftSlideOut: function(options) {
		options.characterRight = false;
		options.slideIn = false;
		KWA.fn.call(this, 'characterSlide', options);
	},

	characterFade: function(options) {
		options = _.extend({
			characterRight: true,
			fadeOut: false,
			duration: 1000,
			easing: Phaser.Easing.Exponential.Out,
			onComplete: function() {}
		}, options);

		var character = (options.characterRight) ? this.characterRight : this.characterLeft;
		character.alpha = (options.fadeOut) ? 1 : 0;
		var tween = this.add.tween(character)
			.to({alpha: (options.fadeOut) ? 0 : 1}, options.duration, options.easing, true);
		tween.onComplete.add(options.onComplete, this);

		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			character.alpha = 1;
		});
	},

	characterRightFadeIn: function(options) {
		options.characterRight = true;
		options.fadeOut = false;
		KWA.fn.call(this, 'characterFade', options);
	},

	characterRightFadeOut: function(options) {
		options.characterRight = true;
		options.fadeOut = true;
		KWA.fn.call(this, 'characterFade', options);
	},

	characterLeftFadeIn: function(options) {
		options.characterRight = false;
		options.fadeOut = false;
		KWA.fn.call(this, 'characterFade', options);
	},

	characterLeftFadeOut: function(options) {
		options.characterRight = false;
		options.fadeOut = true;
		KWA.fn.call(this, 'characterFade', options);
	},

	characterShake: function(options) {
		options = _.extend({
			characterRight: true,
			magnitude: 10,
			duration: 750,
			easing: Phaser.Easing.Exponential.In,
			onComplete: function() {}
		}, options);

		var character = (options.characterRight) ? this.characterRight : this.characterLeft;
		var magnitudeObj = { magnitude: options.magnitude };
		var tween = this.add.tween(magnitudeObj)
			.to({magnitude: 0}, options.duration, options.easing, true)
			.onUpdateCallback(function(tween, value) {
				var magnitude = (1 - value) * options.magnitude;
				var randX = this.rnd.integerInRange(-magnitude, magnitude);
				var randY = this.rnd.integerInRange(-magnitude, magnitude);
				tween.prevRandX = tween.prevRandX || 0; // initialize previous shake values
				tween.prevRandY = tween.prevRandY || 0;
				character.x += (randX - tween.prevRandX); // undo previous shake, then add new shake
				character.y += (randY - tween.prevRandY);
				tween.prevRandX = randX;
				tween.prevRandY = randY;
			}, this);

		var self = this;
		KWA.fn._cleanupFunctions.push(function() {
			tween.stop();
			character.x -= tween.prevRandX || 0;
			character.y -= tween.prevRandY || 0;
		});
	},

	characterRightShake: function(options) {
		options.characterRight = true;
		KWA.fn.call(this, 'characterShake', options);
	},

	characterLeftShake: function(options) {
		options.characterRight = false;
		KWA.fn.call(this, 'characterShake', options);
	}
});