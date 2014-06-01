var KWA = window.KWA = window.KWA || {};

(KWA.STATES = KWA.STATES || {})['test'] = {

	NAMEBOX_YOFFSET: 410,
	NAME_XOFFSET: 10,
	NAME_YOFFSET: 408,
	NAME_OPTIONS: {
		font: '32px Droid Sans Mono',
		fill: '#fff',
		align: 'center'
	},

	DIALOGUEBOX_YOFFSET: 450,
	DIALOGUE_XOFFSET: 8,
	DIALOGUE_YOFFSET: 460,
	DIALOGUE_OPTIONS: {
		font: '32px Droid Sans Mono',
		fill: '#fff',
		align: 'left',
		stroke: 'black',
		strokeThicknes: 1,
		wordWrap: true,
		wordWrapWidth: 798
	},

	create: function() {
        this.stage.setBackgroundColor('#B4DDE9');

        var dialoguebox = this.add.sprite(0, this.DIALOGUEBOX_YOFFSET, 'dialoguebox');
        var namebox = this.add.sprite(0, this.NAMEBOX_YOFFSET, 'namebox');	

        this.name = this.add.text(this.NAME_XOFFSET, this.NAME_YOFFSET, "0123456789AB", this.NAME_OPTIONS);
        this.dialogue = this.add.text(this.DIALOGUE_XOFFSET, this.DIALOGUE_YOFFSET, "1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 ", this.DIALOGUE_OPTIONS);

        this.input.onDown.add(function(evt) {
        	console.log(evt);
        }, this);
	},

	update: function() {

	}
};