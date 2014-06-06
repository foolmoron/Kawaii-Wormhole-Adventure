var KWA = window.KWA = window.KWA || {};

(KWA.STATES = KWA.STATES || {})['datingsim'] = {

	INPUT_MODE: {ADVANCING: 'advancing', WAITING: 'waiting', STOPPED: 'stopped', CHOICE: 'choice', FASTFORWARD: 'fastforward'},

	NAMEBOX_YOFFSET: 410,
	NAME_XOFFSET: 125,
	NAME_YOFFSET: 428,
	NAME_OPTIONS: {
		font: '28px Droid Sans Mono',
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

	QUESTIONMARK_XOFFSET: 765,
	QUESTIONMARK_YOFFSET: 572,
	QUESTIONMARK_SPINDURATION: 2000,

	CHARACTERLEFT_XOFFSET: 200,
	CHARACTERRIGHT_XOFFSET: 600,

	TEXT_INTERVAL: 1000 / 50, // millis per char
	currentText: "",
	currentTextTimer: 0,

	FASTFORWARD_INTERVAL: 1000/12, // millis per dialogue segment
	currentFastForwardTimer: 0,

	FASTFORWARD_TAP_HOLD_TIME: 1000,
	currentFastForwardTapHoldTime: 0,
	fastForwardTapHolding: false,

	DIALOGUE_LINE_CHARACTER_LIMIT: 41,
	DIALOGUE_LINE_NUMBER_LIMIT: 3,
	DIALOGUE_LAST_LINE_CUTOFF: 5,
	dialogueSegments: [],
	currentDialogueSegmentIndex: 0,

	MAX_CHOICES: 4,
	CHOICES_XOFFSET: 400,
	CHOICES_YOFFSET: 150,
	CHOICES_YGAP: 50,
	CHOICES_SHEET: 'choicebox',
	CHOICETEXT_OPTIONS: {
		font: '24px Droid Sans Mono',
		fill: '#fff',
		align: 'center'
	},

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

		for (var i = 0; i < this.MAX_CHOICES; i++) {
			var newChoiceBox = this['choicebox' + i] = this.add.button(this.CHOICES_XOFFSET, this.CHOICES_YOFFSET + (this.CHOICES_YGAP * i), this.CHOICES_SHEET, this.onChoiceSelected, this, 1, 0, 2, 0);
			newChoiceBox.anchor.setTo(0.5);
			newChoiceBox.choiceID = i;
			newChoiceBox.visible = false;
			var newChoiceText = this['choicetext' + i] = this.add.text(this.CHOICES_XOFFSET, this.CHOICES_YOFFSET + (this.CHOICES_YGAP * i), "TEST " + i, this.CHOICETEXT_OPTIONS);
			newChoiceText.anchor.setTo(0.5);
			newChoiceText.visible = false;
		}

		this.advancearrow = this.add.sprite(this.ADVANCEARROW_XOFFSET, this.ADVANCEARROW_YOFFSET, 'advancearrow');
		this.add.tween(this.advancearrow)
			.to({y: this.ADVANCEARROW_YOFFSET + this.ADVANCEARROW_YBOUNCE}, this.ADVANCEARROW_BOUNCEDURATION, null, true, 0, Number.MAX_VALUE, true);
		
		this.fastforwardarrow = this.add.sprite(this.FASTFORWARDARROW_XOFFSET, this.FASTFORWARDARROW_YOFFSET, 'fastforwardarrow');
		this.add.tween(this.fastforwardarrow)
			.to({x: this.FASTFORWARDARROW_XOFFSET + this.FASTFORWARDARROW_XBOUNCE}, this.FASTFORWARDARROW_BOUNCEDURATION, null, true, 0, Number.MAX_VALUE, true);

		this.questionmark = this.add.sprite(this.QUESTIONMARK_XOFFSET, this.QUESTIONMARK_YOFFSET, 'questionmark');
		this.questionmark.anchor.setTo(0.5);
		this.add.tween(this.questionmark)
			.to({angle: 360}, this.QUESTIONMARK_SPINDURATION, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, false);

		this.input.onDown.add(this.onDown, this);
		this.input.onUp.add(this.onUp, this);

		//use special logic on key events to make it more "gamey" and less "text-editory"
		this.keysDown = {}; 
		this.input.keyboard.addCallbacks(this, function(keyEvent) {
			var key = keyEvent.which || keyEvent.keyCode;
			if (!this.keysDown[key]) { // keyDown can only be called once before the corresponding keyUp
				this.keysDown[key] = true;
				this.onKeyDown(key);
			}
		}, function(keyEvent) {
			var key = keyEvent.which || keyEvent.keyCode;
			if (this.keysDown[key]) { // keyUp can only be called after the corresponding keyDown
				delete this.keysDown[key];
				this.onKeyUp(key);
			}
		});
		this.keyInputEnabled = true;

		this.advanceToLine(0);
		this.mode = this.INPUT_MODE.ADVANCING;

		KWA.fn.call(this, 'fadeIn');
	},

	processLine: function(line) {
		var ret = _.extend({
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
		ret.name = ret.name.replace(/\{mc\}/gi, KWA.mc);
		ret.dialogue = ret.dialogue.replace(/\{mc\}/gi, KWA.mc);
		ret.hasChoice = _.isArray(ret.advance);
		return ret;
	},

	advanceToLine: function(lineIndex) {
		if (lineIndex == null) {
			this.mode = this.INPUT_MODE.STOPPED;
			return;
		}

		KWA.fn.cleanupEffects();

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
		this.characterLeft.alpha = 1;
		this.characterRight.alpha = 1;

		if (this.currentLine.cancelFastForward) {
			this.mode = this.INPUT_MODE.ADVANCING;
		}

		this.currentFastForwardTimer = 0;

		if (this.mode != this.INPUT_MODE.FASTFORWARD) {
			if (this.currentLine.func) {
				var funcList = [].concat(this.currentLine.func); // box func into an array if it's not already an array
				var options = [].concat(this.currentLine.options); // same with options
				for (var i = 0; i < funcList.length; i++) {
					var func = funcList[i];
					if (_.isFunction(func)) {
						func.call(this, options[i]);
					} else if (typeof func == 'string') {
						KWA.fn.call(this, func, options[i]);
					}
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
		if (advance == null) {
			return null; // can't advance from this line
		}
		if (_.isFunction(advance)) {
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
			if (this.currentLine.hasChoice && this.currentDialogueSegmentIndex == this.dialogueSegments.length - 1) {
				this.showChoices(this.currentLine);
			} else {
				this.mode = this.INPUT_MODE.WAITING;					
			}
			break;
		case this.INPUT_MODE.WAITING:
			if (this.currentDialogueSegmentIndex == this.dialogueSegments.length - 1) {
				this.advanceToLine(this.getNextLineIndex(this.currentLine));
			} else {
				this.advanceSegment();
			}
			if (this.mode != this.INPUT_MODE.STOPPED) {
				this.mode = this.INPUT_MODE.ADVANCING;
			}
			break;
		}
	},

	showChoices: function(line) {
		if (line.hasChoice) {
			this.currentChoices = line.advance;
			for (var i = 0; i < this.MAX_CHOICES; i++) {

				var choicebox = this['choicebox' + i];
				var choicetext = this['choicetext' + i];
				if (i < this.currentChoices.length) {
					if (typeof this.currentChoices[i].condition == 'function' && !this.currentChoices[i].condition()) {
						continue;
					}
					choicebox.visible = true;
					choicetext.text = this.currentChoices[i].choice.replace(/\{mc\}/gi, KWA.mc);
					choicetext.visible = true;
				}
			}
			this.mode = this.INPUT_MODE.CHOICE;
		}
	},

	onChoiceSelected: function(choicebox) {
		if (this.mode == this.INPUT_MODE.CHOICE) {
			var choice = this.currentChoices[choicebox.choiceID];
			
			this.currentChoices = null;
			for (var i = 0; i < this.MAX_CHOICES; i++) {
				this['choicebox' + i].visible = false;
				this['choicetext' + i].visible = false;
			}

			this.currentLine.advance = choice.advance;
			this.mode = this.INPUT_MODE.WAITING;
			this.advanceText();
		}
	},

	fastForward: function(toggle) {
		if (this.mode == this.INPUT_MODE.CHOICE || this.mode == this.INPUT_MODE.STOPPED) {
			return;
		}

		if (toggle) {
			this.advanceText(); // always advance at least once the instant fastforward is pressed
			this.mode = this.INPUT_MODE.FASTFORWARD;
		} else {
			this.mode = this.INPUT_MODE.ADVANCING;
		}
	},

	onDown: function(pointer) {
		this.advanceText();

		this.currentFastForwardTapHoldTime = 0;
		this.fastForwardTapHolding = true;
	},
	onUp: function(pointer) {
		if (this.fastForwardTapHolding) {
			this.fastForwardTapHolding = false;
			this.currentFastForwardTapHoldTime = 0;
			this.fastForward(false);
		}
	},
	onKeyDown: function(key) {
		if (!this.keyInputEnabled) {
			return;
		}

		if (key == 39 || // right arrow
			key == 40 || // down arrow
			key == 32) { // spacebar
			this.advanceText();
		} else if (key == 16) { // shift
			this.fastForward(true);
		}
	},
	onKeyUp: function(key) {
		if (!this.keyInputEnabled) {
			return;
		}

		if (key == 16) { // shift
			this.fastForward(false);
		}
	},

	update: function() {
		if (this.fastForwardTapHolding && this.mode != this.INPUT_MODE.FASTFORWARD) {
			this.currentFastForwardTapHoldTime += this.time.elapsed;
			if (this.currentFastForwardTapHoldTime >= this.FASTFORWARD_TAP_HOLD_TIME) {
				this.currentFastForwardTapHoldTime = 0;
				this.fastForward(true);
			}
		}

		this.advancearrow.visible = false;
		this.fastforwardarrow.visible = false;
		this.questionmark.visible = false;

		switch (this.mode) {
		case this.INPUT_MODE.ADVANCING:
			this.currentTextTimer += this.time.elapsed;
			if (this.currentTextTimer >= this.TEXT_INTERVAL) {
				var currentDialogueSegment = this.dialogueSegments[this.currentDialogueSegmentIndex];
				var newCharIndex = this.currentText.length;
				if (newCharIndex < currentDialogueSegment.length) {
					this.currentText += currentDialogueSegment.charAt(newCharIndex);
				} else {
					if (this.currentLine.hasChoice && this.currentDialogueSegmentIndex == this.dialogueSegments.length - 1) {
						this.showChoices(this.currentLine);
					} else {
						this.mode = this.INPUT_MODE.WAITING;					
					}
				}
				this.currentTextTimer = 0;
				this.dialogue.text = this.currentText;
			}
			break;
		case this.INPUT_MODE.WAITING:
			this.advancearrow.visible = true;
			break;
		case this.INPUT_MODE.STOPPED:
			break;
		case this.INPUT_MODE.CHOICE:
			this.questionmark.visible = true;
			break;
		case this.INPUT_MODE.FASTFORWARD:
			this.currentFastForwardTimer += this.time.elapsed;
			if (this.currentFastForwardTimer >= this.FASTFORWARD_INTERVAL) {
				this.currentDialogueSegmentIndex++;
				if (this.currentLine.hasChoice && this.currentDialogueSegmentIndex == this.dialogueSegments.length) {
					this.currentDialogueSegmentIndex--;
					this.showChoices(this.currentLine);
				} else if (this.currentDialogueSegmentIndex == this.dialogueSegments.length) {
					this.advanceToLine(this.getNextLineIndex(this.currentLine));
				}
				if (this.mode == this.INPUT_MODE.FASTFORWARD) { // make sure we haven't switched into any alternate modes
					this.currentText = this.dialogueSegments[this.currentDialogueSegmentIndex];
					this.dialogue.text = this.currentText;
				}
				this.currentFastForwardTimer = 0;
			}
			this.fastforwardarrow.visible = true;
			break;
		}
	}
};