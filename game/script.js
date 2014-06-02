var KWA = window.KWA = window.KWA || {};

/*
* The script is made up of lines.  Each line has the following properties:
* label - STR - a keyword which allows other lines to jump to this line - default: null
* name - STR - the name of the speaker of this dialogue - default: ''
* dialogue - STR - the text dialogue in this line - default: ''
* background - STR - if not null, switches to the background sprite of this name - default: null
* characterLeft - STR - switches left character to the sprite of this name - default: 'blank'
* characterRight - STR - switches right character to the sprite of this name - default: 'blank'
* func - the function that will be called when starting this line - default: null
*			STR - calls the global function with this name in KWA.fn with the Phaser state as context
*			FUNC - calls this functions directly with the Phaser state as context
* options - OBJ - options object passed to the above function - default: null
* advance - property that determines what the next line will be (can be several types) - default: 1
*			INT - jumps this many lines forward in the script
*			STR - jumps to the line with this label
*			FUNC - takes (lineIndex, lineObject) as parameters with the Phaser state as context and returns either an int or a string
*/
KWA.SCRIPT = [
	{name: 'one', dialogue: "0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9", background: 'background3', advance: 2},
	{label: 'two', name: 'two', dialogue: "hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2", background: 'background2', characterRight: 'may1', advance: 3},
	{name: 'three', dialogue: "hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3", background: 'background1', characterLeft: 'may2', characterRight: 'jay1', advance: 'two'},
	{name: 'four', dialogue: "hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4", background: 'background1', characterLeft: 'jay2', characterRight: 'may1', advance: 'restart'},
	{name: 'five', dialogue: "hey test5 hey test5 hey test5 hey test5 hey test5 hey test5 hey test5", background: 'background4', characterLeft: 'jay3', advance: -1},
	{label: 'restart', characterLeft: 'may3', func: 'fadeOut', options: { onComplete: function() { this.state.restart(true, false, KWA.SCRIPT); } }}
];

//lint the script lines to make sure there are no hard to find errors
(function(script) {
	var SCRIPT_LINE_IN_CODE = 18;
	var VALID_PROP_NAMES = [
		'label',
		'name',
		'dialogue',
		'background',
		'characterLeft',
		'characterRight',
		'func',
		'options',
		'advance'
	];

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

		//get list of all jumps to specific labels
		if (line.advance && typeof line.advance == 'string') {
			advanceToLabels.push(line.advance);
		}
	}
	//check for any jumps to non-existent labels
	var allLabels = Object.keys(labelToLineMap);
	for (var i = 0; i < advanceToLabels.length; i++) {
		if (allLabels.indexOf(advanceToLabels[i]) < 0) {
			console.error(lineErrorPrefix + " jumps to non-existent label '" + advanceToLabels[i] + "'!");
		}
	}
})(KWA.SCRIPT);