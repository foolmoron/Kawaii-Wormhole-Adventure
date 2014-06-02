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
		strokeThicknes: 1
	},

	ADVANCEARROW_XOFFSET: 750,
	ADVANCEARROW_YOFFSET: 566,
	ADVANCEARROW_YBOUNCE: 5,
	ADVANCEARROW_BOUNCEDURATION: 325,

	CHARACTERLEFT_XOFFSET: 200,
	CHARACTERRIGHT_XOFFSET: 600,

	TEXT_INTERVAL: 1000 / 50, // millis per char
	currentText: "",
	currentTextTimer: 0,

	DIALOGUE_LINE_CHARACTER_LIMIT: 41,
	DIALOGUE_LINE_NUMBER_LIMIT: 3,
	DIALOGUE_LAST_LINE_CUTOFF: 5,
	dialogueSegments: [],
	currentDialogueSegmentIndex: 0,

	init: function(script) {
		this.script = script;
	},

	create: function() {
        this.stage.setBackgroundColor('#B4DDE9');

        //objects are drawn in create-order so do background stuff first
        this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'blank');
        this.background.anchor.setTo(0.5);      

        this.characterLeft = this.add.sprite(this.CHARACTERLEFT_XOFFSET, this.world.height, 'blank');
        this.characterLeft.anchor.setTo(0.5, 1);    
        this.characterRight = this.add.sprite(this.CHARACTERRIGHT_XOFFSET, this.world.height, 'blank');
        this.characterRight.anchor.setTo(0.5, 1);      

        this.namebox = this.add.sprite(0, this.NAMEBOX_YOFFSET, 'namebox');	
        this.name = this.add.text(this.NAME_XOFFSET, this.NAME_YOFFSET, "", this.NAME_OPTIONS);
        this.name.anchor.setTo(0.5);

        this.dialoguebox = this.add.sprite(0, this.DIALOGUEBOX_YOFFSET, 'dialoguebox');
        this.dialogue = this.add.text(this.DIALOGUE_XOFFSET, this.DIALOGUE_YOFFSET, "", this.DIALOGUE_OPTIONS);

        this.advancearrow = this.add.sprite(this.ADVANCEARROW_XOFFSET, this.ADVANCEARROW_YOFFSET, 'advancearrow');
        this.add.tween(this.advancearrow)
        	.to({y: this.ADVANCEARROW_YOFFSET + this.ADVANCEARROW_YBOUNCE}, this.ADVANCEARROW_BOUNCEDURATION, null, true, 0, Number.MAX_VALUE, true);

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
			characterLeft: 'blank',
			characterRight: 'blank',
			func: null,
			options: null
		}, line);
	},

	advanceToLine: function(lineIndex) {
		this.currentLineIndex = lineIndex;
		this.currentLine = this.processLine(this.script[lineIndex]);

		this.dialogueSegments = this.splitTextIntoSegments(this.currentLine.dialogue, this.DIALOGUE_LINE_NUMBER_LIMIT, this.DIALOGUE_LINE_CHARACTER_LIMIT, this.DIALOGUE_LAST_LINE_CUTOFF);
		this.currentDialogueSegmentIndex = 0;
		
		this.name.text = this.currentLine.name;
		this.dialogue.text = '';

		this.currentText = '';
		this.currentTextTimer = 0;

		if (this.currentLine.background) {
			this.background.loadTexture(this.currentLine.background);
		}
		this.characterLeft.loadTexture(this.currentLine.characterLeft);
		this.characterRight.loadTexture(this.currentLine.characterRight);

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

	splitTextIntoSegments: function(text, linesPerSegment, charactersPerLine, lastLineCutoff) {
		var segments = [];
		var words = text.split(' ');

		var currentSegment = '';
		var currentLineCount = 0;
		var currentLineLength = 0;
		for (var i = 0; i < words.length; i++) {
			var currentWord = words[i];
			if (currentLineCount < linesPerSegment) {
				var finalCharsPerLine = charactersPerLine - ((currentLineCount == linesPerSegment - 1) ? lastLineCutoff : 0);
				if (currentLineLength + currentWord.length <= finalCharsPerLine) {
					currentSegment += currentWord + " ";
					currentLineLength += currentWord.length + 1;
				} else {
					currentSegment += "\n";
					currentLineLength = 0;
					currentLineCount++;
					i--; // reprocess current word
				}
			} else {
				segments.push(currentSegment);
				currentSegment = "";
				currentLineLength = 0;
				currentLineCount = 0;
				i--; // reprocess current word
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

			this.advancearrow.visible = false;
			break;
		case this.INPUT_MODE.WAITING:
			this.advancearrow.visible = true;
			break;
		}
	}
};