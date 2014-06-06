var KWA = window.KWA = window.KWA || {};

/* * * DATING SIM SCRIPTING SYSTEM * * *\
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
*			ARR - array of strings or functions that are called right after each other
* options - OBJ/ARR - options object passed to the above function (or functions, if array) - default: null
* advance - property that determines what the next line will be (can be several types) - default: 1
*			INT - jumps this many lines forward in the script
*			STR - jumps to the line with this label
*			FUNC - takes (lineIndex, lineObject) as parameters with the Phaser state as context and returns either an int or a string
*			ARR - array of choice objects, which each defines the following properties:
*				choice - STR - text to display in the choice box - REQUIRED
*				advance - INT/STR - determines the next line, if this choice is selected, using the same rules as the main advance property - REQUIRED
*				condition - FUNC - a function called with the Phaser state as context that returns a boolean that determines whether to show the options - OPTIONAL
*			NULL - cannot advance at all from this line, so there better be a function that does something here
\* * * * * * * * * * * * * * * * * * * */
KWA.SCRIPT = [
	/* INTRO */ { name: "???", dialogue: "WHO are you..?", background: 'bgstarry', func: 'getAndSaveInputString', options: { variableName: 'mc'}},
	{ name: "???", dialogue: "You are '{mc}'. Is this correct?", advance: [{choice: "Yes", advance: 1}, {choice: "No", advance: -1}] },
	{ name: "???", dialogue: "Welcome, {mc}.", func: ['fadeOut', function() { this.mode = this.INPUT_MODE.STOPPED; }], options: {onComplete: function() { this.mode = this.INPUT_MODE.WAITING; this.advanceText(); }}},
	{ label: 'intro', name: "???", dialogue: "You are awake.", background: 'bgstarry', func: 'fadeIn', options: {duration: 2000}},
	{ name: "???", dialogue: "Time is an infinite plane."},
	{ name: "???", dialogue: "We follow a straight line, oblivious to our surroundings."},
	{ name: "???", dialogue: "We know, deep down, that there is more out there. But we choose to ignore it."},
	{ name: "???", dialogue: "Some seek the truth, and crave access to the plane of time. But their eyes remain closed."},
	{ name: "???", dialogue: "Some are desperate for the knowledge of the future, to overcome their obstacles.", func: 'flashBackground', options: {background: 'bgmanor'}},
	{ name: "???", dialogue: "Some are desperate to cling to their past.", func: 'flashBackground', options: {background: 'bgmoon'}},
	{ name: "???", dialogue: "In the infinite plane of time, all points are one. All souls are intertwined."},
	{ name: "???", dialogue: "Open your eyes, and shatter the illusion."},
	{ name: "???", dialogue: "You are awake."},
	/* APARTMENT */ { name: "Window", dialogue: "*crash*", background: 'bgroom', func: 'screenShake'},
	{ name: "{mc}", dialogue: "What the hell was that?!"},
	{ name: "{mc}", dialogue: "(Oh, it was just a crazy dream… I really need to stop playing so many dating sims before bed!)"},
	{ name: "{mc}", dialogue: "(Haha yeah right, they’re way too kawaii for me to resist~~)"},
	{ name: "{mc}", dialogue: "*gets up from bed*"},
	{ name: "{mc}", dialogue: "Oh god dammit!"},
	{ name: "{mc}", dialogue: "(That sound wasn’t a dream. My window is actually busted! How am I going to pay for this?!)"},
	{ name: "{mc}", dialogue: "*notices a strange metal box lying in the middle of an endless sea of glass shards on the apartment floor*"},
	{ name: "{mc}", dialogue: "*reaches for the metal box, carefully avoiding the glass*"},
	{ name: "{mc}", dialogue: "(Where did this come from? Hmm, someone seems to have attached a note to it…)"},
	{ name: "{mc}", dialogue: "Wā… mu… hō… ru"},
	{ name: "{mc}", dialogue: "(Hey, those japanese classes finally came in handy! This says ‘Wormhole v0.1’ in katakana.)"},
	{ name: "{mc}", dialogue: "(Is this some kind of bomb?...)"},
	{ name: "Alarm", dialogue: "*ring* *ring*", func: 'screenShake'},
	{ name: "{mc}", dialogue: "Crap, I’m gonna be late to wo--"},
	{ name: "{mc}", dialogue: "(Oh wait, I don’t have work today, I got fired yesterday.)"},
	{ name: "{mc}", dialogue: "(Why can’t I hold down a job for more than a couple of months? I’m not going to be able to afford rent if this keeps up…)"},
	{ name: "{mc}", dialogue: "(Uh oh, if lose this apartment, where am I going to draw my manga? Well, I guess those things are worthless anyway…)"},
	{ name: "{mc}", dialogue: "*sigh* Now what?"},
	{ name: "{mc}", dialogue: "(Oh right, this Wormhole thing… I really should wait to have my life crisis until after I figure out what this is.)", func: 'fadeIn', options: {color: 0xffffff, duration: 300}},
	{ name: "{mc}", dialogue: "(It’s a cold metallic box with three large buttons on it. There doesn’t seem to be any other way to interact with it. I really hope this doesn’t blow up in my face.)"},
	{ name: "{mc}", dialogue: "(There is a green button in the middle, a red button on the left side, and a blue button on the right side.)"},
	{ name: "{mc}", dialogue: "(I should press one of these buttons, right? What’s the worst that could happen? I’ve got nothing to lose!)"},
	{ name: "{mc}", dialogue: "*stares intently at the green, red, and blue buttons on the device, and…*", advance: [{choice: "*presses the GREEN button*", advance: 1}, {choice: "*presses the RED button*", advance: 3}, {choice: "*presses the BLUE button*", advance: 5}]},
	{ name: "{mc}", dialogue: "*presses the GREEN button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	{ name: "{mc}", dialogue: "*presses the RED button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0xff0000, onComplete: function() { this.advanceText(); }}, advance: 'mayintro'},
	{ name: "{mc}", dialogue: "*presses the BLUE button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0x0000ff, onComplete: function() { this.advanceText(); }}, advance: 'jayintro'},
	/* MAY INTRO */ { label: 'mayintro', name: "{mc}", dialogue: "...", background: 'bgmanor', func: 'fadeIn', options: {duration: 2000}},
	{ name: "{mc}", dialogue: "Ow… my head"},
	{ name: "{mc}", dialogue: "*peels body off floor and looks around*"},
	{ name: "{mc}", dialogue: "(What just happened? Where am I? It looks like the foyer of some sort of old style mansion.)"},
	{ name: "{mc}", dialogue: "(Yeah, just look at these baroque stone pillars and intricately crafted oak furniture. This is definitely the kind of stuff I pretend to know about in order to sound intellectual and impress people.)"},
	{ name: "{mc}", dialogue: "(And this floor is so shiny! Although that doesn’t make it hurt any less to wake up with my face pressed against it. I think I drooled a bit. How long have I been out?)"},
	{ name: "???", dialogue: "Hey! What are you doing to my floor?"},
	{ name: "{mc}", dialogue: "Huh? *looks towards the source of the voice to see a beautiful young girl dressed in a Victorian maid uniform storming into the room*"},
	{ name: "???", dialogue: "I spent hours waxing that floor to perfection, and now you’ve ruined it!", characterRight: 'mayangry', func: ['characterRightSlideIn', 'characterRightFadeIn']},
	{ name: "{mc}", dialogue: "(Wow, she is the most gorgeous girl I’ve ever seen in my life! But why is she wearing that fancy maid uniform?)", characterRight: 'mayangry'},
	{ name: "???", dialogue: "Hey, are you listening to me? Where did you even come from?", characterRight: 'mayangry', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "(Woah, does she do cosplay?! I love cosplay! We’re perfect for each other. I’ve never felt this amazing sense of attraction before. It’s like love at first sight. What should I do?...)", characterRight: 'mayangry', advance: [{choice: "I’m {mc}. What’s your name?", advance: 'maygoodpath'}, {choice: "...", advance: 'maybadend1'}]},
	/* MAY BAD END 1 */ { label: 'maybadend1', name: "{mc}", dialogue: "…", characterRight: 'mayangry'},
	{ name: "???", dialogue: "You need to get out, now! Or I will get The Enforcer to throw you out!", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "The Enforcer...", characterRight: 'mayangry'},
	{ name: "The Enforcer", dialogue: "*ROAARRRR*", func: 'screenShake', characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "(Woah that’s scary… is it even human? I definitely don’t want to deal with that.)", characterRight: 'mayangry', advance: [{choice: "Okay fine, I’ll leave.", advance: 1}, {choice: "Wait, aren’t we supposed to have sex?", advance: 2}]},
	{ name: "{mc}", dialogue: "Okay fine, I’ll leave.", characterRight: 'mayangry', advance: 4},
	{ name: "{mc}", dialogue: "Wait, aren’t we supposed to have sex?", characterRight: 'mayangry'},
	{ name: "???", dialogue: "What are you talking about? Where would even get such an idea? That is a totally ridiculous notion that must have been motivated by a warped entertainment culture designed to exploit the natural naiveté and introversion of society’s youth.", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "Yeah… I think I’m going to leave now.", characterRight: 'mayangry'},
	{ name: "???", dialogue: "Good, see yourself through the front door, please.", characterRight: 'mayangry', func: ['characterRightSlideOut', 'characterRightFadeOut']},
	{ name: "{mc}", dialogue: "..."},
	{ name: "{mc}", dialogue: "(I don’t know where I am, I don’t know where I’m going, and I don’t even know where the front door is!)"},
	{ name: "{mc}", dialogue: "(What am I doing with my life? I wish I could just restart everything from the beginning…)"},
	{ name: "{mc}", dialogue: "*takes out the Wormhole*"},
	{ name: "{mc}", dialogue: "Hmm…", advance: [{choice: "*presses the RED button*", advance: 'maybadend1red'}, {choice: "*presses the GREEN button*", advance: 'maybadend1green'}, {choice: "*presses the BLUE button*", advance: 'maybadend1blue'}]},
	{ label: 'maybadend1red', name: "{mc}", dialogue: "*presses the RED button*"},
	{ name: "{mc}", dialogue: "(Nothing happened… let’s try this again)", advance: [{choice: "*presses the RED button*", advance: 'maybadend1red'}, {choice: "*presses the GREEN button*", advance: 'maybadend1green'}, {choice: "*presses the BLUE button*", advance: 'maybadend1blue'}]},
	{ label: 'maybadend1green', name: "{mc}", dialogue: "*presses the GREEN button*"},
	{ name: "{mc}", dialogue: "...", func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	{ label: 'maybadend1blue', name: "{mc}", dialogue: "*presses the BLUE button*"},
	/* MAY GOOD PATH */ { label: 'maygoodpath', name: "{mc}", dialogue: "I’m {mc}. What’s your name?", characterRight: 'mayangry'},
	{ name: "???", dialogue: "Oh… I’m Maybelline von Hautensworth III, but you can call me May.", characterRight: 'maynormal'},
	{ name: "May", dialogue: "Why are you here? Where did you come from? And what are those strange clothes you’re wearing?", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "Hey, I might not be up to date with the latest 2014 fashion trends, but I thought I looked pretty good when I got up this morning!", characterRight: 'maynormal'},
	{ name: "May", dialogue: "*snrk* 2014? Are you trying to impress me with time traveling stories?", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "(Time travel? ...The Wormhole? It can’t be!)", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "What do you mean, ‘impress me with time traveling’?", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "Surely you are aware that my father is Lawliet von Hautensworth, the top quantum physics researcher of our time, winner of the 1858 Ecchi Prize for his research of quantum entanglement and the time-space continuum.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "Many a fool and many a moron have tried to win me over with ridiculous stories and mathematical proofs of time travel, but none have been able to truly explain the phenomenon.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "And I doubt you are any different. Now, begone from my manor.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "Time travel?! 1858?!... What year is it?", characterRight: 'maynormal'},
	{ name: "May", dialogue: "1864, of course.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "(1864?!?!)", characterRight: 'maynormal', func: 'screenShake'},
	{ name: "{mc}", dialogue: "(Did the Wormhole really send me 150 years into the past? How is this even possible? How do I go back?!...)", characterRight: 'maynormal'},
	{ name: "May", dialogue: "Hey, are you alright? You have been frozen stiff for a couple of minutes.", characterRight: 'maysad', advance: [{choice: "Yeah, sorry, I’m fine.", advance: 1}, {choice: "I need scissors! 61!", advance: 3}]},
	{ name: "{mc}", dialogue: "Yeah, sorry, I’m fine.", characterRight: 'maysad'},
	{ name: "May", dialogue: "I’m glad!", characterRight: 'mayhappy', advance: 3},
	{ name: "{mc}", dialogue: "I need scissors! 61!", characterRight: 'maysad'},
	{ name: "May", dialogue: "Okay, I get it, you watched the popular 1856 acrobatics show, Wooden Carriage Solid. So did everyone else in the 19th century. It needed more naked cartwheels, to be honest.", characterRight: 'mayangry'},
	{ name: "May", dialogue: "Now, tell me what you’re really doing here.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "I really am from the future. From the year 2014. Take a look at this.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "*reveals the Wormhole*", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "It’s called the Wormhole. I was in my apartment in 2014 when I pressed the red button and the next thing I knew, I was waking up in this manor.", characterRight: 'maynormal'},
	{ name: "May", dialogue: "I don’t believe it… this is incredible! With this I can finally prove my General Theory of Hentai Illogicity!", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "Your theory…? I thought your father was the physicist.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "Oh, he is, but I help him with his research. I even came up with the theory that won him the Ecchi Prize.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "That’s amazing! But then why are you treated like a maid? You should be the one with the Ecchi Prize, and the fame.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "You really must be from a different time. In our age, women cannot be scientists. If the people knew that I am the secret behind my father’s research, we would persecuted to the ends of the world. Our lives would never be the same.", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "That is a tough situation, but…", characterRight: 'maysad', advance: [{choice: "...your survival is your top priority.", advance: 'maybadend2'}, {choice: "...you don’t want things to be the same.", advance: 'maygoodend'}]},
	/* MAY BAD END 2 */ { label: 'maybadend2', name: "{mc}", dialogue: "...your survival should be your top priority.", characterRight: 'maysad'},
	{ name: "May", dialogue: "You really think so?", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "It’s easy to tell someone to take risks and be bold, but that is chasing a fantasy. In reality, the costs are too great to take risks when a safe alternative is possible. You and your father’s lives are at stake! What is life if you lose it all to a risk?", characterRight: 'maysad'},
	{ name: "May", dialogue: "You’re right. I have always known what you are saying is true, but I guess I just didn’t want to accept it.", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(Did I say the right thing, I wonder? It almost looks like May has lost hope. I always thought life was about taking the safe route, and ensuring survival, but maybe there is more to it than that. If May had the right motivation, could she change the world?)", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "Hey May, actually I--", characterRight: 'maysad'},
	{ name: "May", dialogue: "{mc}, it was great meeting you, but I want you to take the Wormhole and go back to your time now.", characterRight: 'mayangry', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "But, your Theory…", characterRight: 'mayangry'},
	{ name: "May", dialogue: "Please try to forget about that. Once you’re gone, I will also try to forget...", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(She is gripping my hands tightly. It feels nice…)", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(Wait, she’s reaching for the Wormhole? What is she doing? She pressed the green button!!)", characterRight: 'maysad', func: 'screenShake'},
	{ name: "{mc}", dialogue: "May, wait!", characterRight: 'maysad'},
	{ name: "May", dialogue: "Goodbye, MC.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "But we still haven’t had sex together! This is all wrong--", characterRight: 'maysexy', func: 'screenShake'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', func: ['fadeOut', 'characterRightFadeOut'], options: {onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	/* MAY GOOD END */ { label: 'maygoodend', name: "{mc}", dialogue: "...you don’t want things to be the same.", characterRight: 'maysad'},
	{ name: "May", dialogue: "What?", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "A girl as cute and intelligent as you should not live in secrecy and treated like a maid!", characterRight: 'maynormal'},
	{ name: "May", dialogue: "You really think so?", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Yes! You are one of the top quantum physicists of the 19th century, and definitely the most beautiful physicist I’ve ever known!", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "(As if I knew any other physicists… I don’t even know what a ‘quantum entanglement’ is!)", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Don’t try to flatter me! You know society would never accept me as a scientist. My life would be over.", characterRight: 'mayangry', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "I would accept you.", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "There’s a first for everything. Maybe you are the woman society is waiting for to change things for the better. You must believe that if you follow your heart, you will be accepted, and you can improve the world. What is life if you’re not willing to risk what you have for what you really want?", characterRight: 'maysexy'},
	{ name: "May", dialogue: "{mc}, I understand. I have a responsibility to be true to myself and to the world. I will present my findings to the public and finally take ownership of my life!", characterRight: 'maynormal'},
	{ name: "May", dialogue: "You have taught me so much, MC!", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "(Now’s my chance!)", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "Actually, I haven’t taught you anything yet.", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "*grabs May and pulls her close*", characterRight: 'maysexy', func: 'characterRightShake', options: {magnitude: 5, duration: 500}},
	{ name: "May", dialogue: "This is… inappropriate.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Then let’s take this somewhere more appropriate. How many rooms are there in this manor?", characterRight: 'maysexy'},
	{ name: "May", dialogue: "1 foyer, 1 attic, 2 kitchens, 3 living rooms, 5 bedrooms, and 8 bathrooms…", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "That’s a strangely sexy number of rooms… let’s have sex in all of them!", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Follow me… and I’ll demonstrate the physics of simple harmonic motion.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Seriously? Even I know how lame of a physics joke that was...", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Give me a break! I’m new to this!", characterRight: 'mayhappy', func: ['characterRightSlideOut', 'characterRightFadeOut'], options: {duration: 2000}},
	{ name: "{mc}", dialogue: "…", func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "???", dialogue: "You have opened your eyes to a truth of the universe.", background: 'bgstarry', func: 'fadeIn'},
	{ name: "???", dialogue: "You have acquired the SOUL OF COURAGE.", func: 'acquireCourage'},
	{ name: "???", dialogue: "You are awake.", func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", background: 'bgmanor', func: 'fadeIn'},
	{ name: "May", dialogue: "Wow, MC, you’re amazing! I wish you could stay, but I know that’s not possible...", characterRight: 'mayhappy', func: 'characterRightFadeIn'},
	{ name: "{mc}", dialogue: "May, you are the most amazing girl I have ever known in my life, past, and future. I must return back to my time, as there is still much to do. I don’t know exactly what yet, but I there is a duty I must fulfill.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "I will never forget you, MC.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "I know I won’t forget you, either, May. No matter what happens to my memory when I return back to my time, I know that you have changed me permanently, and there’s no way that will ever be lost.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "pulls out the Wormhole, maintaining a steadfast, solemn gaze towards May*", characterRight: 'maysexy'},
	{ name: "May", dialogue: "MC, I love yo--", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "*presses green button*", characterRight: 'maysexy', func: ['fadeOut', 'characterRightFadeOut'], options: {onComplete: function() { this.advanceText(); }}, advance: 'intro'}
];

//lint the script lines to make sure there are no hard to find errors
(function(script) {
	var SCRIPT_LINE_IN_CODE = 28;
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
	var funcToLineMap = [];

	for (var i = 0; i < script.length; i++) {
		var lineErrorPrefix = "Line " + i + " (code line " + (SCRIPT_LINE_IN_CODE + i) + ")";
		var line = script[i];

		//check for misspelled properties
		for (var prop in line) {
			if (VALID_PROP_NAMES.indexOf(prop) < 0) {
				console.error(lineErrorPrefix + " contains misspelled property '" + prop + "'!");
			}
		}

		if (line.dialogue) {
			//check for whitespace padding dialogue
			if (line.dialogue[0] == ' ' || line.dialogue[line.dialogue.length - 1] == ' ') {
				console.error(lineErrorPrefix + " dialogue has extra whitespace padding it!");
			}
			//check for double spaces
			if (line.dialogue.search('  ') > 0) {
				console.error(lineErrorPrefix + " dialogue has double space!");
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

		//get list of all func strings used
		if (line.func) {
			if (typeof line.func == 'string') {
				funcToLineMap.push({func: line.func, line: i});
			} else if (_.isArray(line.func)) {
				for (var j = 0; j < line.func.length; j++) {
					if (typeof line.func[j] == 'string') {
						funcToLineMap.push({func: line.func[j], line: i});
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

	//check for calls to non-existent functions
	for (var i = 0; i < funcToLineMap.length; i++) {
		if (!(funcToLineMap[i].func in KWA.fn)) {
			console.error("Line " + funcToLineMap[i].line + " (code line " + (SCRIPT_LINE_IN_CODE + funcToLineMap[i].line) + ")" + " calls non-existent function '" + funcToLineMap[i].func + "'!");
		}
	}
})(KWA.SCRIPT);