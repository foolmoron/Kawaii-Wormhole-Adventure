var KWA = window.KWA = window.KWA || {};

/*
* The script is made up of lines.  Each line has the following properties:
* label - STR - a keyword which allows other lines to jump to this line - default: null
* name - STR - the name of the speaker of this dialogue - default: ''
* dialogue - STR - the text dialogue in this line - default: ''
* background - STR - if not null, switches to the background sprite of this name - default: null
* characterLeft - STR - switches left character to the sprite of this name - default: 'blank'
* characterRight - STR - switches right character to the sprite of this name - default: 'blank'
* cancelFastForward - bool - if set to true, forcibly disables fastforward at start of this line - default: false
* func - the function that will be called when starting this line - default: null
*			STR - calls the global function with this name in KWA.fn with the Phaser state as context
*			FUNC - calls this functions directly with the Phaser state as context
* options - OBJ - options object passed to the above function - default: null
* advance - property that determines what the next line will be (can be several types) - default: 1
*			INT - jumps this many lines forward in the script
*			STR - jumps to the line with this label
*			FUNC - takes (lineIndex, lineObject) as parameters with the Phaser state as context and returns either an int or a string
*			ARR - array of choice objects, which each MUST define the following properties:
*				choice - STR - text to display in the choice box
*				advance - INT/STR - determines the next line, if this choice is selected, using the same rules as the main advance property
*/
KWA.SCRIPT = [
	{name: 'one', dialogue: "0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9", background: 'background3', advance: 2},
	{label: 'two', name: 'two', dialogue: "hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2", background: 'background2', characterRight: 'may1', advance: 3},
	{name: 'three', dialogue: "hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3", background: 'background1', characterLeft: 'may2', characterRight: 'jay1', advance: 'two'},
	{name: 'four', dialogue: "hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4", background: 'background1', characterLeft: 'jay2', characterRight: 'may1', advance: 'restart'},
	{name: 'five', dialogue: "hey test5 hey test5 hey test5 hey test5 hey test5 hey test5 hey test5 55555 55555 55555 55555 55555 55555 55555 55555 55555 55555 55555 55555 55555 this", background: 'background4', characterLeft: 'jay3', advance: [{choice: "four does more", advance: -1}, {choice: "six 'n sticks", advance: 1}, {choice: "eight is great", advance: 'eight'}]},
	{name: 'six', dialogue: "hey test6 hey test6 hey test6 hey test6 hey test6 hey test6 hey test6", background: 'background3', characterLeft: 'may1', advance: 1},
	{name: 'seven', dialogue: "hey test7 hey test7 hey test7 hey test7 hey test7 hey test7 hey test7", background: 'background2', characterLeft: 'jay1', characterRight: 'may2', advance: 1},
	{label: 'eight', name: 'eight', dialogue: "hey test8 hey test8 hey test8 hey test8 hey test8 hey test8 hey test8", background: 'background1', characterRight: 'may3', advance: 1},
	{label: 'restart', characterLeft: 'may3', cancelFastForward: true, func: 'fadeOut', options: { onComplete: function() { this.state.restart(true, false, KWA.SCRIPT); } }}
];

//lint the script lines to make sure there are no hard to find errors
(function(script) {
	var SCRIPT_LINE_IN_CODE = 25;
	var VALID_PROP_NAMES = [
		'label',
		'name',
		'dialogue',
		'background',
		'characterLeft',
		'characterRight',
		'cancelFastForward',
		'func',
		'options',
		'advance'
	];
	var MAX_CHOICES = 4;
	var MAX_CHOICE_LENGTH = 40;

	var labelToLineMap = {};
	var advanceToLabels = [];

	for (var i = 0; i < script.length; i++) {
		var lineErrorPrefix = "Line " + i + " (code line " + (SCRIPT_LINE_IN_CODE + i) + ")";
		var line = script[i];

		//check for misspelled properties
		for (var prop in line) {
			if (VALID_PROP_NAMES.indexOf(prop) < 0) {
				console.error(lineErrorPrefix + " contains misspelled property '" + prop + "'!");
			}
		}

		//check for duplicate labels
		if (line.label) {
			if (labelToLineMap[line.label] != null) {
				console.error(lineErrorPrefix + " has duplicate label '" + line.label + "', used by line " + labelToLineMap[line.label] + " (code line " + (SCRIPT_LINE_IN_CODE + labelToLineMap[line.label]) + ")!");
			}
			labelToLineMap[line.label] = i;
		}

		if (_.isArray(line.advance)) {
			for (var j = 0; j < line.advance.length; j++) {
				var currentChoice = line.advance[j];

				//check that choices contain the right properties
				if (!(typeof currentChoice.choice == 'string' && (typeof currentChoice.advance == 'string' || typeof currentChoice.advance == 'number'))) {
					console.error(lineErrorPrefix + " choice " + j + " has malformed properties! It must contain a string 'choice' and a string/integer 'advance'.");
				}

				//check for choices with overly long text
				if (currentChoice.choice.length > MAX_CHOICE_LENGTH) {
					console.error(lineErrorPrefix + " choice " + j + " is " + line.advance[j].choice.length + " characters long! The limit is " + MAX_CHOICE_LENGTH + " characters.");
				}
			}
		}

		//get list of all jumps to specific labels
		if (line.advance) {
			if (typeof line.advance == 'string') {
				advanceToLabels.push({label: line.advance, line: i});
			} else if (_.isArray(line.advance)) {
				for (var j = 0; j < line.advance.length; j++) {
					if (typeof line.advance[j].advance == 'string') {
						advanceToLabels.push({label: line.advance[j].advance, line: i});
					}
				}				
			}
		}
	}
	//check for any jumps to non-existent labels
	var allLabels = Object.keys(labelToLineMap);
	for (var i = 0; i < advanceToLabels.length; i++) {
		if (allLabels.indexOf(advanceToLabels[i].label) < 0) {
			console.error("Line " + advanceToLabels[i].line + " (code line " + (SCRIPT_LINE_IN_CODE + advanceToLabels[i].line) + ")" + " jumps to non-existent label '" + advanceToLabels[i].label + "'!");
		}
	}
})(KWA.SCRIPT);