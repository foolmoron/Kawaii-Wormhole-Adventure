var KWA = window.KWA = window.KWA || {};

/*
* The script is made up of lines.  Each line has the following options:
* label - STR - a keyword which allows other lines to jump to this line - default: null
* name - STR - the name of the speaker of this dialogue - default: ''
* dialogue - STR - the text dialogue in this line - default: ''
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
	{name: 'one', dialogue: "hey test1 hey test1 hey test1 hey test1 hey test1 hey test1 hey test1", func: function() { console.log('1'); }, advance: 2},
	{label: 'two', name: 'two', dialogue: "hey test2 hey test2 hey test2 hey test2 hey test2 hey test2 hey test2", func: function() { console.log('2'); }, advance: function(i, line) { console.log(this); return 2; }},
	{name: 'three', dialogue: "hey test3 hey test3 hey test3 hey test3 hey test3 hey test3 hey test3", func: function() { console.log('3'); }, advance: 'two'},
	{name: 'four', dialogue: "hey test4 hey test4 hey test4 hey test4 hey test4 hey test4 hey test4", func: function() { console.log('4'); }, advance: 'restart'},
	{name: 'five', dialogue: "hey test5 hey test5 hey test5 hey test5 hey test5 hey test5 hey test5", func: function() { console.log('5'); }},
	{label: 'restart', func: 'fadeOut', options: { onComplete: function() { this.state.restart(true, false, KWA.SCRIPT); } }}
];