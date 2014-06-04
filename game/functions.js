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
	},

	fade: function(options) {
		options = _.extend({
			fadeOut: false,
			color: 'black',
			duration: 1000,
			onComplete: function() {}
		}, options);

		var fade = this.add.graphics(0, 0);
        fade.beginFill(options.color, 1);
        fade.drawRect(-this.game.width / 2, -this.game.height / 2, this.game.width * 2, this.game.height * 2);
        fade.alpha = (options.fadeOut) ? 0 : 1;
        fade.endFill();

        var tween = this.add.tween(fade)
        	.to({alpha: (options.fadeOut) ? 1 : 0}, options.duration)
        	.start();
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
			magnitude: 30,
			duration: 1000,
			onComplete: function() {}
		}, options);

		var magnitudeObj = { magnitude: options.magnitude };
		var tween = this.add.tween(magnitudeObj)
        	.to({magnitude: 0}, options.duration, null, true)
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

	characterSlide: function(options) {
		options = _.extend({
			characterRight: true,
			slideIn: true,
			duration: 1000,
			onComplete: function() {}
		}, options);

		var character = (options.characterRight) ? this.characterRight : this.characterLeft;
		var originalX = character.x;
		var outsideScreenX = (options.characterRight) ? 1000: -200; // 200 units off screen
		character.x = (options.slideIn) ? outsideScreenX : originalX;
        var tween = this.add.tween(character)
        	.to({x: (options.slideIn) ? originalX : outsideScreenX}, options.duration)
        	.start();
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
			onComplete: function() {}
		}, options);

		var character = (options.characterRight) ? this.characterRight : this.characterLeft;
		character.alpha = (options.fadeOut) ? 1 : 0;
        var tween = this.add.tween(character)
        	.to({alpha: (options.fadeOut) ? 0 : 1}, options.duration)
        	.start();
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
	}
});