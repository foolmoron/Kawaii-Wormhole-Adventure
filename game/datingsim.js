var KWA = window.KWA = window.KWA || {};

(KWA.STATES = KWA.STATES || {})['datingsim'] = {

	INPUT_MODE: {ADVANCING: 'advancing', WAITING: 'waiting', FASTFORWARD: 'fastforward'},

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

	FASTFORWARDARROW_XOFFSET: 755,
	FASTFORWARDARROW_YOFFSET: 565,
	FASTFORWARDARROW_XBOUNCE: 5,
	FASTFORWARDARROW_BOUNCEDURATION: 325,

	CHARACTERLEFT_XOFFSET: 200,
	CHARACTERRIGHT_XOFFSET: 600,

	TEXT_INTERVAL: 1000 / 50, // millis per char
	currentText: "",
	currentTextTimer: 0,

	FASTFORWARD_INTERVAL: 1000/8, // millis per dialogue segment
	currentFastForwardTimer: 0,

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
        
        this.fastforwardarrow = this.add.sprite(this.FASTFORWARDARROW_XOFFSET, this.FASTFORWARDARROW_YOFFSET, 'fastforwardarrow');
        this.add.tween(this.fastforwardarrow)
        	.to({x: this.FASTFORWARDARROW_XOFFSET + this.FASTFORWARDARROW_XBOUNCE}, this.FASTFORWARDARROW_BOUNCEDURATION, null, true, 0, Number.MAX_VALUE, true);

        this.input.onDown.add(this.onDown, this);
        this.input.onUp.add(this.onUp, this);
        this.input.keyboard.addCallbacks(this, this.onKeyDown, this.onKeyUp);

        this.advanceToLine(0);
		this.mode = this.INPUT_MODE.ADVANCING;

        KWA.fn.call(this, 'fadeIn');
	},

	processLine: function(line) {
		return _.extend({
			label: null,
			name: '',
			dialogue: '',
			background: null,
			characterLeft: 'blank',
			characterRight: 'blank',
			cancelFastForward: false,
			func: null,
			options: null,
			advance: 1
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

		if (this.currentLine.cancelFastForward) {
			this.mode = this.INPUT_MODE.ADVANCING;
		}

		this.currentFastForwardTimer = 0;

		if (this.mode != this.INPUT_MODE.FASTFORWARD) {
			var func = this.currentLine.func;
			if (func) {
				if (_.isFunction(func)) {
					func.call(this, this.currentLine.options);
				} else if (typeof func == 'string') {
					KWA.fn.call(this, func, this.currentLine.options);
				}
			}
		}
	},

	advanceSegment: function() {
		if (this.currentDialogueSegmentIndex < this.dialogueSegments.length) {
			this.currentDialogueSegmentIndex++;

			this.dialogue.text = '';

			this.currentText = '';
			this.currentTextTimer = 0;
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

	advanceText: function() {
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
			this.mode = this.INPUT_MODE.ADVANCING;
			break;
		}
	},

	fastForward: function(toggle) {
		if (toggle) {
			this.advanceText(); // always advance at least once the instant fastforward is pressed
			this.mode = this.INPUT_MODE.FASTFORWARD;
		} else {
			this.mode = this.INPUT_MODE.ADVANCING;
		}
	},

	onDown: function(pointer) {
		this.advanceText();
	},
	onUp: function(pointer) {

	},
	onKeyDown: function(keyEvent) {
		var key = keyEvent.which || keyEvent.keyCode;
		if (key == 39 || // right arrow
			key == 40 || // down arrow
			key == 32) { // spacebar
			this.advanceText();
		} else if (key == 16) { // shift
			this.fastForward(true);
		}
	},
	onKeyUp: function(keyEvent) {
		var key = keyEvent.which || keyEvent.keyCode;
		if (key == 16) { // shift
			this.fastForward(false);
		}
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
				this.dialogue.text = this.currentText;
			}

			this.advancearrow.visible = false;
			this.fastforwardarrow.visible = false;
			break;
		case this.INPUT_MODE.WAITING:
			this.advancearrow.visible = true;
			this.fastforwardarrow.visible = false;
			break;
		case this.INPUT_MODE.FASTFORWARD:
			this.currentFastForwardTimer += this.time.elapsed;
			if (this.currentFastForwardTimer >= this.FASTFORWARD_INTERVAL) {
				this.currentDialogueSegmentIndex++;
				if (this.currentDialogueSegmentIndex >= this.dialogueSegments.length) {
					this.advanceToLine(this.getNextLineIndex(this.currentLine));
				}
				this.currentText = this.dialogueSegments[this.currentDialogueSegmentIndex];
				this.dialogue.text = this.currentText;
				this.currentFastForwardTimer = 0;
			}

			this.advancearrow.visible = false;
			this.fastforwardarrow.visible = true;
			break;
		}
	}
};