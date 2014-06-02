var KWA = window.KWA = window.KWA || {};

(KWA.STATES = KWA.STATES || {})['datingsim'] = {

	INPUT_MODE: {ADVANCING: 'advancing', WAITING: 'waiting'},

	DEFAULT_BACKGROUND_SPRITE: 'backgrounddefault',

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

	DIALOGUE_CHARACTER_LIMIT: 100,
	dialogueSegments: [],
	currentDialogueSegmentIndex: 0,

	init: function(script) {
		this.script = script;
	},

	create: function() {
        this.stage.setBackgroundColor('#B4DDE9');

        //objects are drawn in create-order so do background stuff first
        this.background = this.add.sprite(this.world.centerX, this.world.centerY, this.DEFAULT_BACKGROUND_SPRITE);
        this.background.anchor.setTo(0.5);

        this.namebox = this.add.sprite(0, this.NAMEBOX_YOFFSET, 'namebox');	
        this.name = this.add.text(this.NAME_XOFFSET, this.NAME_YOFFSET, "", this.NAME_OPTIONS);
        this.name.anchor.setTo(0.5);

        this.dialoguebox = this.add.sprite(0, this.DIALOGUEBOX_YOFFSET, 'dialoguebox');
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
			background: null,
			func: null,
			options: null
		}, line);
	},

	advanceToLine: function(lineIndex) {
		this.currentLineIndex = lineIndex;
		this.currentLine = this.processLine(this.script[lineIndex]);

		this.dialogueSegments = this.splitTextIntoSegments(this.currentLine.dialogue, this.DIALOGUE_CHARACTER_LIMIT);
		this.currentDialogueSegmentIndex = 0;
		
		this.name.text = this.currentLine.name;
		this.dialogue.text = '';

		this.currentText = '';
		this.currentTextTimer = 0;

		if (this.currentLine.background) {
			this.background.loadTexture(this.currentLine.background);
		}

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

	advanceSegment: function() {
		if (this.currentDialogueSegmentIndex < this.dialogueSegments.length) {
			this.currentDialogueSegmentIndex++;

			this.dialogue.text = '';

			this.currentText = '';
			this.currentTextTimer = 0;

			this.mode = this.INPUT_MODE.ADVANCING;
		}
	},

	splitTextIntoSegments: function(text, characterLimit) {
		var segments = [];
		var words = text.split(' ');

		var currentSegment = '';
		for (var i = 0; i < words.length; i++) {
			var currentWord = words[i];
			if (currentSegment.length + currentWord.length + 1 <= characterLimit) {
				currentSegment += currentWord + " ";
			} else {
				segments.push(currentSegment);
				currentSegment = currentWord + " ";
			}
		}
		if (currentSegment.length > 0) {
			segments.push(currentSegment);
		}

		return (segments.length > 0) ? segments : ['']; // always return at least one segment
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
			this.currentText = this.dialogueSegments[this.currentDialogueSegmentIndex];
			this.dialogue.text = this.currentText;
			this.mode = this.INPUT_MODE.WAITING;
			break;
		case this.INPUT_MODE.WAITING:
			if (this.currentDialogueSegmentIndex == this.dialogueSegments.length - 1) {
				this.advanceToLine(this.getNextLineIndex(this.currentLine));
			} else {
				this.advanceSegment();
			}
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
				var currentDialogueSegment = this.dialogueSegments[this.currentDialogueSegmentIndex];
				var newCharIndex = this.currentText.length;
				if (newCharIndex < currentDialogueSegment.length) {
					this.currentText += currentDialogueSegment.charAt(newCharIndex);
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