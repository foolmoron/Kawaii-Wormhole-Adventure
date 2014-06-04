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
        fade.drawRect(0, 0, this.game.width, this.game.height);
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
				console.log(magnitude);
				var randX = this.rnd.integerInRange(-magnitude, magnitude);
				var randY = this.rnd.integerInRange(-magnitude, magnitude);
    			this.world.setBounds(randX, randY, this.game.width + randX, this.game.height + randY);
        	}, this);
	}
});