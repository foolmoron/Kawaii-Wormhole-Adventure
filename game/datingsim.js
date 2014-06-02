var KWA = window.KWA = window.KWA || {};

(KWA.STATES = KWA.STATES || {})['datingsim'] = {

	INPUT_MODE: {ADVANCING: 'advancing', WAITING: 'waiting'},

	NAMEBOX_YOFFSET: 410,
	NAME_XOFFSET: 125,
	NAME_YOFFSET: 427,
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
		wordWrapWidth: 790
	},

	TEXT_INTERVAL: 1000 / 20, // millis per char
	currentText: "",
	currentTextTimer: 0,

	init: function(script) {
		this.script = script;
	},

	create: function() {
        this.stage.setBackgroundColor('#B4DDE9');

        var namebox = this.add.sprite(0, this.NAMEBOX_YOFFSET, 'namebox');	
        var dialoguebox = this.add.sprite(0, this.DIALOGUEBOX_YOFFSET, 'dialoguebox');
        this.name = this.add.text(this.NAME_XOFFSET, this.NAME_YOFFSET, "", this.NAME_OPTIONS);
        this.name.anchor.setTo(0.5);
        this.dialogue = this.add.text(this.DIALOGUE_XOFFSET, this.DIALOGUE_YOFFSET, "", this.DIALOGUE_OPTIONS);

        this.input.onDown.add(this.onDown, this);
        this.input.onUp.add(this.onUp, this);

        this.advanceToLine(0);

        KWA.fn.call(this, 'fadeIn');
	},

	processLine: function(line) {
		return _.extend({
			label: null,
			name: '',
			dialogue: '',
			advance: 1,
			func: null,
			options: null
		}, line);
	},

	advanceToLine: function(lineIndex) {
		this.currentLineIndex = lineIndex;
		this.currentLine = this.processLine(this.script[lineIndex]);
		
		this.name.text = this.currentLine.name;
		this.dialogue.text = '';

		this.currentText = '';
		this.currentTextTimer = 0;

		this.mode = this.INPUT_MODE.ADVANCING;

		var func = this.currentLine.func;
		if (func) {
			if (_.isFunction(func)) {
				func.call(this, this.currentLine.options);
			} else if (typeof func == 'string') {
				KWA.fn.call(this, func, this.currentLine.options);
			}
		}
	},

	getNextLineIndex: function(line) { 
		var advance = line.advance;
		if (_.isFunction(line.advance)) {
			advance = line.advance.call(this, this.currentLineIndex, this.currentLine);
		}
		if (!isNaN(parseInt(advance, 10))) {
			return this.currentLineIndex + parseInt(advance, 10);
		} else if (typeof advance == 'string') {
			for (var i = 0; i < this.script.length; i++) {
				if (this.script[i].label == advance) {
					return i;
				}
			}
		}
	},

	onDown: function(pointer) {
		switch (this.mode) {
		case this.INPUT_MODE.ADVANCING:
			this.currentText = this.currentLine.dialogue;
			this.dialogue.text = this.currentText;
			this.mode = this.INPUT_MODE.WAITING;
			break;
		case this.INPUT_MODE.WAITING:
			this.advanceToLine(this.getNextLineIndex(this.currentLine));
			break;
		}
	},
	onUp: function(pointer) {

	},

	update: function() {
		switch (this.mode) {
		case this.INPUT_MODE.ADVANCING:
			this.currentTextTimer += this.time.elapsed;
			if (this.currentTextTimer >= this.TEXT_INTERVAL) {
				var newCharIndex = this.currentText.length;
				if (newCharIndex < this.currentLine.dialogue.length) {
					this.currentText += this.currentLine.dialogue.charAt(newCharIndex);
				} else {
					this.mode = this.INPUT_MODE.WAITING;					
				}
				this.currentTextTimer = 0;
			}
			this.dialogue.text = this.currentText;
			break;
		case this.INPUT_MODE.WAITING:
			break;
		}
	}
};