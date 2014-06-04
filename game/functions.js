var KWA = window.KWA = window.KWA || {};

KWA.fn = KWA.fn || {};
_.extend(KWA.fn, {
	call: function(stateContext, functionName, options) {
		this[functionName].call(stateContext, options || {});
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

        this.add.tween(fade)
        	.to({alpha: (options.fadeOut) ? 1 : 0}, options.duration)
        	.start()
        	.onComplete.add(options.onComplete, this);
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

		if (this._screenShakeRecord) {
			this._oldScreenShakeTween.stop();
		}

		var magnitudeObj = { magnitude: options.magnitude };
		this._oldScreenShakeTween = this.add.tween(magnitudeObj)
        	.to({magnitude: 0}, options.duration, null, true)
        	.onUpdateCallback(function(tween, value) {
        		var magnitude = (1 - value) * options.magnitude; // 'value' is just raw interp value, so we have to manually calculate magnitude
				var randX = this.rnd.integerInRange(-magnitude, magnitude);
				var randY = this.rnd.integerInRange(-magnitude, magnitude);
    			this.world.setBounds(randX, randY, this.game.width + randX, this.game.height + randY);
        	}, this);
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
        this.add.tween(character)
        	.to({x: (options.slideIn) ? originalX : outsideScreenX}, options.duration)
        	.start()
        	.onComplete.add(options.onComplete, this);
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
        this.add.tween(character)
        	.to({alpha: (options.fadeOut) ? 0 : 1}, options.duration)
        	.start()
        	.onComplete.add(options.onComplete, this);
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