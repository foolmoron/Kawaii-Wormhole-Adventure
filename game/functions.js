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
	}
});