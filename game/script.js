var KWA = window.KWA = window.KWA || {};

/* * * DATING SIM SCRIPTING SYSTEM * * *\
* The script is made up of lines.  Each line has the following properties:
* label - STR - a keyword which allows other lines to jump to this line - default: null
* name - STR - the name of the speaker of this dialogue - default: ''
* dialogue - STR - the text dialogue in this line - default: ''
* background - STR - if not null, switches to the background sprite of this name - default: null
* music - STR - if not null, switches to the background music of this name - default: null
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
	/* INTRO */ { name: "???", dialogue: "Welcome.", background: 'bgstarry', music: ''},
	{ name: "???", dialogue: "Who are you..?", func: 'getAndSaveInputString', options: { variableName: 'mc'}},
	{ name: "???", dialogue: "You are '{mc}'. Is this correct?", advance: [{choice: "Yes", advance: 1}, {choice: "No", advance: -1}] },
	{ name: "???", dialogue: "Welcome, {mc}.", func: ['fadeOut', function() { this.mode = this.INPUT_MODE.STOPPED; }], options: {onComplete: function() { this.mode = this.INPUT_MODE.WAITING; this.advanceText(); }}},
	{ label: 'intro', name: "???", dialogue: "You are awake.", background: 'bgstarry', music: '', func: 'fadeIn', options: {duration: 2000}},
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
	{ name: "{mc}", dialogue: "What the hell was that?!", music: 'generic'},
	{ name: "{mc}", dialogue: "(Oh, it was just a crazy dream... I really need to stop playing so many dating sims before bed!)"},
	{ name: "{mc}", dialogue: "(Haha yeah right, they’re way too kawaii for me to resist~~)"},
	{ name: "{mc}", dialogue: "*gets up from bed*"},
	{ name: "{mc}", dialogue: "Oh god dammit!"},
	{ name: "{mc}", dialogue: "(That sound wasn’t a dream. My window is actually busted! How am I going to pay for this?!)"},
	{ name: "{mc}", dialogue: "*notices a strange metal box lying in the middle of an endless sea of glass shards on the apartment floor*"},
	{ name: "{mc}", dialogue: "*reaches for the metal box, carefully avoiding the glass*"},
	{ name: "{mc}", dialogue: "(Where did this come from? Hmm, someone seems to have attached a note to it...)"},
	{ name: "{mc}", dialogue: "Wā... mu... hō... ru"},
	{ name: "{mc}", dialogue: "(Hey, those japanese classes finally came in handy! This says ‘Wormhole v0.1’ in katakana.)"},
	{ name: "{mc}", dialogue: "(Is this some kind of bomb?...)"},
	{ name: "Alarm", dialogue: "*ring* *ring*", func: 'screenShake'},
	{ name: "{mc}", dialogue: "Crap, I’m gonna be late to wo--"},
	{ name: "{mc}", dialogue: "(Oh wait, I don’t have work today, I got fired yesterday.)"},
	{ name: "{mc}", dialogue: "(Why can’t I hold down a job for more than a couple of months? I’m not going to be able to afford rent if this keeps up...)"},
	{ name: "{mc}", dialogue: "(Uh oh, if lose this apartment, where am I going to draw my manga? Well, I guess those things are worthless anyway...)"},
	{ name: "{mc}", dialogue: "*sigh* Now what?"},
	{ name: "{mc}", dialogue: "(Oh right, this Wormhole thing... I really should wait to have my life crisis until after I figure out what this is.)", func: 'fadeIn', options: {color: 0xffffff, duration: 300}},
	{ name: "{mc}", dialogue: "(It’s a cold metallic box with three large buttons on it. There doesn’t seem to be any other way to interact with it. I really hope this doesn’t blow up in my face.)"},
	{ name: "{mc}", dialogue: "(There is a green button in the middle, a red button on the left side, and a blue button on the right side.)"},
	{ name: "{mc}", dialogue: "(I should press one of these buttons, right? What’s the worst that could happen? I’ve got nothing to lose!)"},
	{ name: "{mc}", dialogue: "*stares intently at the green, red, and blue buttons on the device, and...*", advance: [{choice: "*presses the GREEN button*", advance: 1}, {choice: "*presses the RED button*", advance: 3}, {choice: "*presses the BLUE button*", advance: 5}]},
	{ name: "{mc}", dialogue: "*presses the GREEN button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	{ name: "{mc}", dialogue: "*presses the RED button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0xff0000, onComplete: function() { this.advanceText(); }}, advance: 'mayintro'},
	{ name: "{mc}", dialogue: "*presses the BLUE button*"},
	{ name: "{mc}", dialogue: "Wooaaahhhh!!!", func: ['fadeOut', 'fadeOut'], options: {color: 0x0000ff, onComplete: function() { this.advanceText(); }}, advance: 'jayintro'},
	/* MAY INTRO */ { label: 'mayintro', name: "{mc}", dialogue: "...", background: 'bgmanor', func: 'fadeIn', options: {duration: 2000}},
	{ name: "{mc}", dialogue: "Ow... my head", music: 'may'},
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
	/* MAY BAD END 1 */ { label: 'maybadend1', name: "{mc}", dialogue: "...", characterRight: 'mayangry'},
	{ name: "???", dialogue: "You need to get out, now! Or I will get The Enforcer to throw you out!", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "The Enforcer...", characterRight: 'mayangry'},
	{ name: "The Enforcer", dialogue: "*ROAARRRR*", func: 'screenShake', characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "(Woah that’s scary... is it even human? I definitely don’t want to deal with that.)", characterRight: 'mayangry', advance: [{choice: "Okay fine, I’ll leave.", advance: 1}, {choice: "Wait, aren’t we supposed to have sex?", advance: 2}]},
	{ name: "{mc}", dialogue: "Okay fine, I’ll leave.", characterRight: 'mayangry', advance: 4},
	{ name: "{mc}", dialogue: "Wait, aren’t we supposed to have sex?", characterRight: 'mayangry'},
	{ name: "???", dialogue: "What are you talking about? Where would even get such an idea? That is a totally ridiculous notion that must have been motivated by a warped entertainment culture designed to exploit the natural naiveté and introversion of society’s youth.", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "Yeah... I think I’m going to leave now.", characterRight: 'mayangry'},
	{ name: "???", dialogue: "Good, see yourself through the front door, please.", characterRight: 'mayangry', func: ['characterRightSlideOut', 'characterRightFadeOut']},
	{ name: "{mc}", dialogue: "..."},
	{ name: "{mc}", dialogue: "(I don’t know where I am, I don’t know where I’m going, and I don’t even know where the front door is!)"},
	{ name: "{mc}", dialogue: "(What am I doing with my life? I wish I could just restart everything from the beginning...)"},
	{ name: "{mc}", dialogue: "*takes out the Wormhole*"},
	{ name: "{mc}", dialogue: "Hmm...", advance: [{choice: "*presses the RED button*", advance: 'maybadend1red'}, {choice: "*presses the GREEN button*", advance: 'maybadend1green'}, {choice: "*presses the BLUE button*", advance: 'maybadend1blue'}]},
	{ label: 'maybadend1red', name: "{mc}", dialogue: "*presses the RED button*"},
	{ name: "{mc}", dialogue: "(Nothing happened... let’s try this again)", advance: [{choice: "*presses the RED button*", advance: 'maybadend1red'}, {choice: "*presses the GREEN button*", advance: 'maybadend1green'}, {choice: "*presses the BLUE button*", advance: 'maybadend1blue'}]},
	{ label: 'maybadend1green', name: "{mc}", dialogue: "*presses the GREEN button*"},
	{ name: "{mc}", dialogue: "...", func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	{ label: 'maybadend1blue', name: "{mc}", dialogue: "*presses the BLUE button*"},
	/* MAY GOOD PATH */ { label: 'maygoodpath', name: "{mc}", dialogue: "I’m {mc}. What’s your name?", characterRight: 'mayangry'},
	{ name: "???", dialogue: "Oh... I’m Maybelline von Hautensworth III, but you can call me May.", characterRight: 'maynormal'},
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
	{ name: "May", dialogue: "I don’t believe it... this is incredible! With this I can finally prove my General Theory of Hentai Illogicity!", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "Your theory...? I thought your father was the physicist.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "Oh, he is, but I help him with his research. I even came up with the theory that won him the Ecchi Prize.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "That’s amazing! But then why are you treated like a maid? You should be the one with the Ecchi Prize, and the fame.", characterRight: 'maynormal'},
	{ name: "May", dialogue: "You really must be from a different time. In our age, women cannot be scientists. If the people knew that I am the secret behind my father’s research, we would persecuted to the ends of the world. Our lives would never be the same.", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "That is a tough situation, but...", characterRight: 'maysad', advance: [{choice: "...your survival is your top priority.", advance: 'maybadend2'}, {choice: "...you don’t want things to be the same.", advance: 'maygoodend'}, {choice: "...forget everything and come with me!", advance: 'trueend', condition: function() { return localStorage.getItem('optimism'); }}]},
	/* MAY BAD END 2 */ { label: 'maybadend2', name: "{mc}", dialogue: "...your survival should be your top priority.", characterRight: 'maysad'},
	{ name: "May", dialogue: "You really think so?", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "It’s easy to tell someone to take risks and be bold, but that is chasing a fantasy. In reality, the costs are too great to take risks when a safe alternative is possible. You and your father’s lives are at stake! What is life if you lose it all to a risk?", characterRight: 'maysad'},
	{ name: "May", dialogue: "You’re right. I have always known what you are saying is true, but I guess I just didn’t want to accept it.", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(Did I say the right thing, I wonder? It almost looks like May has lost hope. I always thought life was about taking the safe route, and ensuring survival, but maybe there is more to it than that. If May had the right motivation, could she change the world?)", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "Hey May, actually I--", characterRight: 'maysad'},
	{ name: "May", dialogue: "{mc}, it was great meeting you, but I want you to take the Wormhole and go back to your time now.", characterRight: 'mayangry', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "But, your Theory...", characterRight: 'mayangry'},
	{ name: "May", dialogue: "Please try to forget about that. Once you’re gone, I will also try to forget...", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(She is gripping my hands tightly. It feels nice...)", characterRight: 'maysad'},
	{ name: "{mc}", dialogue: "(Wait, she’s reaching for the Wormhole? What is she doing? She pressed the green button!!)", characterRight: 'maysad', func: 'screenShake'},
	{ name: "{mc}", dialogue: "May, wait!", characterRight: 'maysad'},
	{ name: "May", dialogue: "Goodbye, {mc}.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "But we still haven’t had sex together! This is all wrong--", characterRight: 'maysexy', func: 'screenShake'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', func: ['fadeOut', 'characterRightFadeOut'], options: {onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	/* MAY GOOD END */ { label: 'maygoodend', name: "{mc}", dialogue: "...you don’t want things to be the same.", characterRight: 'maysad'},
	{ name: "May", dialogue: "What?", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "A girl as cute and intelligent as you should not live in secrecy and treated like a maid!", characterRight: 'maynormal'},
	{ name: "May", dialogue: "You really think so?", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Yes! You are one of the top quantum physicists of the 19th century, and definitely the most beautiful physicist I’ve ever known!", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "(As if I knew any other physicists... I don’t even know what a ‘quantum entanglement’ is!)", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Don’t try to flatter me! You know society would never accept me as a scientist. My life would be over.", characterRight: 'mayangry', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "I would accept you.", characterRight: 'mayangry'},
	{ name: "{mc}", dialogue: "There’s a first for everything. Maybe you are the woman society is waiting for to change things for the better. You must believe that if you follow your heart, you will be accepted, and you can improve the world. What is life if you’re not willing to risk what you have for what you really want?", characterRight: 'maysexy'},
	{ name: "May", dialogue: "{mc}, I understand. I have a responsibility to be true to myself and to the world. I will present my findings to the public and finally take ownership of my life!", characterRight: 'maynormal'},
	{ name: "May", dialogue: "You have taught me so much, {mc}!", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "(Now’s my chance!)", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "Actually, I haven’t taught you anything yet.", characterRight: 'mayhappy'},
	{ name: "{mc}", dialogue: "*grabs May and pulls her close*", characterRight: 'maysexy', func: 'characterRightShake', options: {magnitude: 5, duration: 500}},
	{ name: "May", dialogue: "This is... inappropriate.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Then let’s take this somewhere more appropriate. How many rooms are there in this manor?", characterRight: 'maysexy'},
	{ name: "May", dialogue: "1 foyer, 1 attic, 2 kitchens, 3 living rooms, 5 bedrooms, and 8 bathrooms...", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "That’s a strangely sexy number of rooms... let’s have sex in all of them!", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Follow me... and I’ll demonstrate the physics of simple harmonic motion.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "Seriously? Even I know how lame of a physics joke that was...", characterRight: 'maysexy'},
	{ name: "May", dialogue: "Give me a break! I’m new to this!", characterRight: 'mayhappy', func: ['characterRightSlideOut', 'characterRightFadeOut'], options: {duration: 2000}},
	{ name: "{mc}", dialogue: "...", func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "???", dialogue: "You have opened your eyes to a truth of the universe.", background: 'bgstarry', music: 'main', func: 'fadeIn'},
	{ name: "???", dialogue: "You have acquired the SOUL OF COURAGE.", func: 'acquireCourage'},
	{ name: "???", dialogue: "You are awake.", func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", background: 'bgmanor', func: 'fadeIn'},
	{ name: "May", dialogue: "Wow, {mc}, you’re amazing! I wish you could stay, but I know that’s not possible...", characterRight: 'mayhappy', func: 'characterRightFadeIn'},
	{ name: "{mc}", dialogue: "May, you are the most amazing girl I have ever known in my life, past, and future. I must return back to my time, as there is still much to do. I don’t know exactly what yet, but I there is a duty I must fulfill.", characterRight: 'mayhappy'},
	{ name: "May", dialogue: "I will never forget you, {mc}.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "I know I won’t forget you, either, May. No matter what happens to my memory when I return back to my time, I know that you have changed me permanently, and there’s no way that will ever be lost.", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "pulls out the Wormhole, maintaining a steadfast, solemn gaze towards May*", characterRight: 'maysexy'},
	{ name: "May", dialogue: "{mc}, I love yo--", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "*presses green button*", characterRight: 'maysexy', func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	/* JAY INTRO */ { label: 'jayintro', name: "{mc}", dialogue: "...", background: 'bgmoon', func: 'fadeIn', options: {duration: 2000}},
	{ name: "{mc}", dialogue: "*opens eyes to see the vast expanse of space above*", music: 'jay'},
	{ name: "{mc}", dialogue: "(What just happened? Where am I? Are those stars..?)"},
	{ name: "{mc}", dialogue: "(What is this soft material I’m laying on? It feels artificial, but also organic. Is this grass?)"},
	{ name: "{mc}", dialogue: "*gets up, struggling to maintain balance*"},
	{ name: "???", dialogue: "Hi there!", func: 'screenShake'},
	{ name: "{mc}", dialogue: "Woah! *turns around to see a strange boy standing in the middle of the field*", characterRight: 'jaynormal', func: 'characterRightSlideIn'},
	{ name: "{mc}", dialogue: "(What the hell is this boy doing scaring me?... Woah, he’s super cute. I can’t stay mad at him. I’ve never seen anyone who looks him before! I need to know more about him.)", characterRight: 'jaynormal'},
	{ name: "???", dialogue: "Did you have a nice trip?", characterRight: 'jayhappy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'jayhappy', advance: [{choice: "Nice trip..? What do you mean?", advance: 1}, {choice: "You’re super cute! I think I love you!", advance: 3}]},
	{ name: "{mc}", dialogue: "Nice trip..? What do you mean?", characterRight: 'jayhappy'},
	{ name: "???", dialogue: "Haha...", characterRight: 'jayhappy', advance: 3},
	{ name: "{mc}", dialogue: "You’re super cute! I think I love you!", characterRight: 'jayhappy'},
	{ name: "???", dialogue: "...", characterRight: 'jaysexy'},
	{ name: "???", dialogue: "I am Jeяr’l-β, but I suppose in your language you can call me Jay.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(Woah, what was that weird name that he gave? I don’t think I can even make those sounds. I’ll stick to calling him Jay.)", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Okay, Jay, my name is {mc}. What do you mean by ‘trip’? Did I go somewhere? Where are we?", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "Well, you came from there *points at blue sphere in the sky*", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "And now you’re here, on Moonbase 515!", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(Moonbase 515?! Is that blue sphere... Earth? It can’t be! This is impossible! I feel like throwing up...)", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "It’s normal if you feel like throwing up. That’s the effect of the reduced gravitational pull of the Moon compared to Earth.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(He’s so mysterious...)", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "But how did I get here?", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "*points to the strange device in your hand*", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(The Wormhole..?)", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "That’s a Wormhole. A really old prototype, actually. Version 0.1 if I’m not mistaken.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "It lets you warp the space-time continuum. Basically, time travel!", characterRight: 'jayhappy'},
	{ name: "{mc}", dialogue: "(This is literally the craziest thing that has ever happened to me, beyond my wildest imaginations, but I still can’t seem to take my mind off how cute this boy is!)", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "As the caretaking clone of this base, I have seen many people from all over the time spectrum end up here. It’s pretty fun learning from where they came, but usually they are too worried about going back home...", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "...", characterRight: 'jaynormal', advance: [{choice: "Wait, how DO I get back home?!", advance: 'jaybadend1'}, {choice: "Caretaking clone... are you a clone?!", advance: 'jaygoodpath'}]},
	/* JAY BAD END 1 */ { label: 'jaybadend1', name: "{mc}", dialogue: "Wait, how DO I get back home?!", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "Just stay calm, and--", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Calm?! I’m on the god damn Moon right now! This is too crazy. I need to get out of here! Oh god I can’t breathe!", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "You can breathe, you idiot. This garden is in an Atmospheric Control Dome.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Shut your stupid sexy mouth and help me get out of here!", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Well, you just take the Wormhole and--", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Of course, the Wormhole! *takes out the Wormhole*", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "AAAHHHHHHHHH", characterRight: 'jaysad', advance: [{choice: "*furiously presses the RED button*", advance: 'jaybadend1red'}, {choice: "*furiously presses the GREEN button*", advance: 'jaybadend1green'}, {choice: "*furiously presses the BLUE button*", advance: 'jaybadend1blue'}]},
	{ label: 'jaybadend1red', name: "{mc}", dialogue: "*furiously presses the RED button*", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(Nothing happened?!)", characterRight: 'jaysad', advance: [{choice: "*furiously presses the RED button*", advance: 'jaybadend1red'}, {choice: "*furiously presses the GREEN button*", advance: 'jaybadend1green'}, {choice: "*furiously presses the BLUE button*", advance: 'jaybadend1blue'}]},
	{ label: 'jaybadend1green', name: "{mc}", dialogue: "*furiously presses the GREEN button*", characterRight: 'jaysad', func: 'screenShake'},
	{ name: "{mc}", dialogue: "Aha! It worked!", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(But wait, what about Jay? I never learned about him and his story...)", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(I never even got to explore his sweet little body!)", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Wait, Jay, I didn’t mean to--", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Goodbye, {mc}.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "...", characterRight: 'jaysad', func: ['fadeOut', 'fadeOut', 'characterRightFadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	{ label: 'jaybadend1blue', name: "{mc}", dialogue: "*furiously presses the BLUE button*", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(Nothing happened?!)", characterRight: 'jaysad', advance: [{choice: "*furiously presses the RED button*", advance: 'jaybadend1red'}, {choice: "*furiously presses the GREEN button*", advance: 'jaybadend1green'}, {choice: "*furiously presses the BLUE button*", advance: 'jaybadend1blue'}]},
	/* JAY GOOD PATH */ { label: 'jaygoodpath', name: "{mc}", dialogue: "Caretaking clone... are you a clone?!", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Well yes, why do you think I am out here taking care of the garden?", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "My original, Jeяr’l-α, was a highly revered general who died in The Great War 18 years ago, and his last wish was for a clone of himself to be created. My family obeyed his wishes and here I am.", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "But my family has been made up of pure originals for the last 11 generations, so they never accepted me, despite my original’s wishes. When I was 6, they sold me to the clone trade, and I’ve been working on the Moon ever since. Most clones end up this way, doing the manual labor.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "That sounds a lot like the discrimination and inequality we had in my time.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "Haha, no way! Our society has evolved so much from those barbaric pre-3K times we learned about in school. There hasn’t been a recorded incident of racism in over 1200 years! No offense, {mc}, but you can’t compare your young, uncivilized era to our advanced galactic society. We’re just too different.", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "So as I was saying, we work in the fields in exchange for basic shelter and food. It’s pretty rough. We also have no representation in the Council, as currently all councilmen are originals.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(Okay, that’s literally the same as 18th century slavery. But I can’t argue with those adorable eyes! I wonder if I can free him and take him back home with me...)", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Jay, I have an idea. You should escape this slavery and come back to 2014 with me!", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "That’s a nice offer, but I’m really okay where I am. Besides, I’ve got this keeping me here.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "*points to small metallic device on leg, with three buttons*", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "It’s an advanced version of the Wormhole. The clone masters can use it to find me and bring me back here, no matter where I travel in the space-time continuum.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Well then just take it off and run!", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "It’s not that easy. This is a Clone Wormhole, with an automatic alarm mechanism that fires when it is removed without the use of an Original Wormhole. But no original would help a clone escape like that...", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "I can help! *takes out Wormhole*", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "This is an Original Wormhole, isn’t it? I can use it to free you.", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Yes, but your Wormhole is a prototype. It might be destroyed in the process. If you help me, you might never be able to return home again.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(I really want to help Jay, but what’s the point if I can’t return home. I don’t think I can handle living in this strange time for the rest of my life. Jay could really be the love of my life, but the risk is too great. What should I do..?)", characterRight: 'jaysad', advance: [{choice: "You’re right, I can’t do it.", advance: 'jaybadend2'}, {choice: "I’ll do it.", advance: 'jaygoodend', condition: function() { return localStorage.getItem('courage'); }}]},
	/* JAY BAD END 2 */ { label: 'jaybadend2', name: "{mc}", dialogue: "You’re right, I can’t do it.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "If the Wormhole is my only way home, then I cannot risk it, no matter how much I want to be with you.", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "I understand.", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "You’re not the first one to make that decision, and you won’t be the last...", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "(I wish I had the courage to help Jay, but...)", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Jay, I’m sorry.", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "I know. It’s time for you to go back home.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(He’s making the Wormhole react without even touching it... )", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "Goodbye, {mc}.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Jay, wait! I love yo--", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "...", characterRight: 'jaysexy', func: ['fadeOut', 'fadeOut', 'characterRightFadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	/* JAY GOOD END */ { label: 'jaygoodend', name: "{mc}", dialogue: "(What is this feeling? I can sense someone trying to speak to me...)", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "To achieve what you truly desire in life, you must take risks.", music: 'may', characterRight: 'jaysad', characterLeft: 'maynormal', func: 'characterLeftFadeIn'},
	{ name: "{mc}", dialogue: "(May... you’re lending me your strength. I will treasure your words.)", characterRight: 'jaysad', characterLeft: 'maynormal'},
	{ name: "May", dialogue: "I’m glad. I am a part of you now, so let’s do this together!", characterRight: 'jaysad', characterLeft: 'mayhappy'},
	{ name: "May", dialogue: "By the way, I loved that thing you did with your tongue...", characterRight: 'jaysad', characterLeft: 'mayhappy', func: 'characterLeftFadeOut', options: {duration: 3000}},
	{ name: "{mc}", dialogue: "(...thank you, May.)", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "...", music: 'jay', characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "I’ll do it.", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Don’t be silly, {mc}. I’m not worth it.", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "You’re worth it to me!", characterRight: 'jaysad', func: 'screenShake'},
	{ name: "Jay", dialogue: "Thanks, {mc}, but believe me, it really is okay. My life may not be perfect right now, but it will get better eventually if I just keep going. I know it will!", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "No! That’s wrong!", characterRight: 'jaynormal', func: 'screenShake'},
	{ name: "{mc}", dialogue: "If you ever want things to get better, you have to realize that there are problems right now that you must fix. Apathy is not a form of optimism!", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Your family has disowned you. You are a slave. You have to focus on changing things right now, or else it will never happen.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "I think I finally understand. I’ve been working in these bases for years, and there’s no sign of that changing anytime soon. I have to take control of my destiny for myself.", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "{mc}... thank you. You have freed my mind.", characterRight: 'jayhappy'},
	{ name: "{mc}", dialogue: "Now let me free your body. Take my Wormhole and use it to escape.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "*takes the Wormhole v0.1 and holds it up to the Clone Wormhole*", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "There’s no going back. Are you sure about this?", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Just do it already!", characterRight: 'jaynormal', func: 'screenShake'},
	{ name: "Jay", dialogue: "Okay... *activates both Wormholes, releasing a blinding wave of energy*", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "AAAHHHHHHH", characterRight: 'jaynormal', func: 'fadeOut', options: {color: 0xffffff, duration: 500, onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", characterRight: 'jaynormal', func: 'fadeIn', options: {color: 0xffffff, duration: 2000}},
	{ name: "{mc}", dialogue: "Did it work?", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "I can’t believe it. I’m finally free!", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "And {mc}, your Wormhole is still working! It survived the unlocking procedure. You can still go home!", characterRight: 'jayhappy'},
	{ name: "{mc}", dialogue: "Right now all I care about is that you’re happy, Jay.", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "Hey... why are you staring at me with that face?", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "Well, there was a sexual inhibitor component in my Clone Wormhole that was removed in the process, so now I’m feeling a strange urge to pounce on the next person I see!", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "*leaps towards you and hugs you forcefully, taking you both to the ground*", characterRight: 'jaysexy', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "(Wow he is just too cute. I’ve been waiting for this ever since waking up in this Moonbase!)", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "Jay... shouldn’t we go somewhere more comfortable?", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "No way, right here is just fine. By the way, did you know this flower is a powerful aphrodisiac..?", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "*grabs a handful of petals from reddish flowers sprouting nearby in the grass*", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "Jay! Keep those things away from me!", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'jaysexy', func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "???", dialogue: "You have opened your eyes to a truth of the universe.", background: 'bgstarry', music: 'main', func: 'fadeIn'},
	{ name: "???", dialogue: "You have acquired the SOUL OF OPTIMISM.", func: 'acquireOptimism'},
	{ name: "???", dialogue: "You are awake.", func: 'fadeOut', options: {duration: 2000, onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", background: 'bgmoon', characterRight: 'jaysexy', func: ['fadeIn', 'characterRightFadeIn']},
	{ name: "{mc}", dialogue: "That was out of this world!", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "...never heard that one before...", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "Well, I’ve read a lot about the brutish pre-3K mating rituals, but I never knew I would enjoy it so much!", characterRight: 'jaysexy', advance: [{choice: "That’s because I’m just that good.", advance: 1}, {choice: "You weren’t that great, though.", advance: 3}]},
	{ name: "{mc}", dialogue: "That’s because I’m just that good.", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "You’re cocky, but I can’t blame you!", characterRight: 'jayhappy', advance: 5},
	{ name: "{mc}", dialogue: "You weren’t that great, though.", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "Really..?", characterRight: 'jaysad'},
	{ name: "{mc}", dialogue: "Just kidding!", characterRight: 'jaysad'},
	{ name: "Jay", dialogue: "Don’t do that to me! You’re the worst...", characterRight: 'jayhappy'},
	{ name: "Jay", dialogue: "I wish we could stay like this forever...", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "We can. Come back to my time with me. We can make a new life together!", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "{mc}, I can’t, and it’s your fault. You taught me something today. You made me realize that I must look to the future. I can’t dwell on the past, or live contently in the present. I want to improve myself.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "I believe in you, Jay. I must return to my time and continue my journey, but I have a feeling that I will see you again.", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "I know we will see each other again. Our souls are now bound by love and destiny. We will never be truly separated ever again.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "And that’s just the way I want it...", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "*pulls out Wormhole and readies the green button*", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "Jay, I love yo--", characterRight: 'jaynormal'},
	{ name: "Jay", dialogue: "*rushes up and gives you a passionate kiss*", characterRight: 'jaysexy'},
	{ name: "Jay", dialogue: "I love you, too. Goodbye, {mc}.", characterRight: 'jaynormal'},
	{ name: "{mc}", dialogue: "(He caught me off guard! My head is spinning... but here goes nothing.)", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "*presses the green button*", characterRight: 'jaysexy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'jaysexy', func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}, advance: 'intro'},
	/* TRUE END */ { label: 'trueend', name: "{mc}", dialogue: "...forget everything and come with me!", characterRight: 'maynormal'},
	{ name: "Jay", dialogue: "You’re taking your destiny into your own hands now, {mc}.", music: 'jay', characterRight: 'maynormal', characterLeft: 'jayhappy', func: 'characterLeftFadeIn'},
	{ name: "{mc}", dialogue: "(Jay, are you ready to meet a new friend?)", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "(Get ready, we’re coming to see you!)", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "Jay", dialogue: "I’ve been missing you for a long time, {mc}", characterRight: 'maynormal', characterLeft: 'jaysexy'},
	{ name: "Jay", dialogue: "Or maybe it’s the opposite of a long time?", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "(Jay, with your help, and May’s, I can finally make something of myself.)", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "{mc}", dialogue: "(Sit tight, I’ll see you soon.)", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "*leaps forwards for a kiss, but vanishes right before your eyes*", characterRight: 'maynormal', characterLeft: 'jaysexy', func: ['characterLeftShake', 'characterLeftFadeOut']},
	{ name: "{mc}", dialogue: "...", music: 'may', characterRight: 'maynormal'},
	{ name: "May", dialogue: "Come with you? But why? And where?", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "May, I need you to help me turn my life around. Let’s let go of our pasts and rush head first into the future!", characterRight: 'maynormal'},
	{ name: "{mc}", dialogue: "Take my hand.", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "*pulls May close and readies the Wormhole*", characterRight: 'maysexy', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "Hold on tight!", characterRight: 'maysexy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', func: ['fadeOut', 'fadeOut'], options: {color: 0x0000ff, onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", background: 'bgmoon', music: 'jay', characterRight: 'maynormal', func: 'fadeIn'},
	{ name: "Jay", dialogue: "{mc}!", characterRight: 'maynormal', characterLeft: 'jayhappy', func: ['characterLeftSlideIn', 'characterLeftFadeIn']},
	{ name: "Jay", dialogue: "You came back! And you brought a... friend?", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "This is May. No time to explain, just grab on!", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "*pulls Jay in with the group and readies the Wormhole once again*", characterRight: 'maynormal', characterLeft: 'jayhappy', func: 'characterLeftShake'},
	{ name: "{mc}", dialogue: "Here we go!", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maynormal', characterLeft: 'jaynormal', func: ['fadeOut', 'fadeOut'], options: {color: 0x00ff00, onComplete: function() { this.advanceText(); }}},
	{ name: "Jay", dialogue: "Where are we..?", background: 'bgroom', music: 'generic', characterRight: 'maynormal', characterLeft: 'jaynormal', func: 'fadeIn'},
	{ name: "{mc}", dialogue: "This is my apartment in 2014.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "Incredible! Look at all this wonderful modern technology! My friends in the 19th century would never believe this!", characterRight: 'mayhappy', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Are you from the 19th century, May?", characterRight: 'mayhappy', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "Why yes, Jay, I am. And you?", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "I’m a clone from a moonbase in the year 4014.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "And I must say, I never expected to see a brutish 19th century girl as beautiful as you.", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "May", dialogue: "Umm... I’ll take that as a compliment.", characterRight: 'maynormal', characterLeft: 'jayhappy', advance: [{choice: "Get a room, you two!", advance: 1}, {choice: "I can’t tell which one of you is cuter!", advance: 5}]},
	{ name: "{mc}", dialogue: "Get a room, you two!", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "As far as I can tell, we’re already in a room...", characterRight: 'maysexy', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Are you thinking what I’m thinking, May?", characterRight: 'maysexy', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "Of course.", characterRight: 'maysexy', characterLeft: 'jaynormal', advance: 5},
	{ name: "{mc}", dialogue: "I can’t decide which one of you is cuter!", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Well there’s only one way to find out!", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "A competition?", characterRight: 'mayhappy', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "...", characterRight: 'mayhappy', characterLeft: 'jayhappy'},
	{ name: "Jay", dialogue: "Well I’m going first! *leaps towards you*", characterRight: 'maynormal', characterLeft: 'jaysexy', func: 'characterLeftShake'},
	{ name: "May", dialogue: "I won’t let you beat me! *leaps on top of you as well*", characterRight: 'maysexy', characterLeft: 'jaysexy', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "Guys, wait! This is too much for me to take!", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "May", dialogue: "Be quiet and let us handle it.", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "Jay", dialogue: "Well, not too quiet!", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', characterLeft: 'jaysexy', func: ['fadeOut', 'screenShake'], options: {onComplete: function() { this.advanceText(); }}},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', characterLeft: 'jaysexy', func: 'fadeIn', options: {duration: 2000}},
	{ name: "May", dialogue: "Jay, I have to admit, you’re pretty good.", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "Jay", dialogue: "And you are surprisingly knowledgeable about these ridiculous, savage mating rituals. In a good way of course!", characterRight: 'maysad', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "(I’m totally spent... but I can’t complain. This is exactly what I wanted to happen! I’m so good at this.)", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "Hey Jay, next time we should use your future cloning technology to make a few copies of ourselves and really have some fun!", characterRight: 'maysexy', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "I think I could arrange that...", characterRight: 'maysexy', characterLeft: 'jaysexy', advance: [{choice: "Are you guys trying to kill me?!", advance: 1}, {choice: "Great idea!", advance: 4}]},
	{ name: "{mc}", dialogue: "Are you guys trying to kill me?!", characterRight: 'maysexy', characterLeft: 'jaysexy', func: 'screenShake'},
	{ name: "{mc}", dialogue: "{mc}, you knew what you were doing when you brought us together.", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "{mc}", dialogue: "Yeah, yeah.", characterRight: 'maysexy', characterLeft: 'jaysexy', advance: 7},
	{ name: "{mc}", dialogue: "Great idea!", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "Jay", dialogue: "Hold on a second, don’t you think we could use that technology for something more productive? I mean, your era can’t even comprehend the implications of cloning. We could be the GODS of this world. All of humanity in our palms, free to do anything we could ever dream of.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "{mc}", dialogue: "Eh, I would rather just have crazy sex.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Haha, I was just testing you! Everyone knows that using time travel for personal gain never turns out well, especially after the Y3K incident.", characterRight: 'maynormal', characterLeft: 'jayhappy'},
	{ name: "May", dialogue: "You’re going to have to explain that to me sometime, Jay.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Sure, but only in exchange for some mating lessons.", characterRight: 'maynormal', characterLeft: 'jaysexy'},
	{ name: "{mc}", dialogue: "Okay, we’ve had our fun. Now let’s get back to the reason I brought you two here.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "May", dialogue: "Yeah, why did you bring us all the way to your time, anyway?", characterRight: 'mayangry', characterLeft: 'jaynormal'},
	{ name: "Jay", dialogue: "Probably just to have sex!", characterRight: 'mayangry', characterLeft: 'jayhappy'},
	{ name: "{mc}", dialogue: "Actually, I wanted to thank you two for putting me on the right path in life. I want you to know how deeply you have affected my soul. You are the reason I am a better person, and will continue becoming a better person. Without May’s courage and Jay’s optimism, I would’ve still been an unemployed loser, sitting in my room, lamenting my situation but doing nothing to change it. You two taught me what is really important in life, and now I can finally move on with my life in a meaningful way.", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maynormal', characterLeft: 'jaynormal'},
	{ name: "{mc}", dialogue: "But mostly just to have sex.", characterRight: 'mayhappy', characterLeft: 'jayhappy'},
	{ name: "Jay", dialogue: "Told you!", characterRight: 'mayhappy', characterLeft: 'jayhappy'},
	{ name: "May", dialogue: "Never change, {mc}.", characterRight: 'mayhappy', characterLeft: 'jayhappy'},
	{ name: "Jay", dialogue: "Enough with the talking, we’re wasting time.", characterRight: 'mayhappy', characterLeft: 'jayhappy'},
	{ name: "Jay", dialogue: "*leaps on you once again*", characterRight: 'mayhappy', characterLeft: 'jaysexy', func: 'characterLeftShake'},
	{ name: "May", dialogue: "Hey, stop leaving me behind!", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "May", dialogue: "*leaps on you as well*", characterRight: 'maysexy', characterLeft: 'jaysexy', func: 'characterRightShake'},
	{ name: "{mc}", dialogue: "... I love you guys", characterRight: 'maysexy', characterLeft: 'jaysexy'},
	{ name: "{mc}", dialogue: "...", characterRight: 'maysexy', characterLeft: 'jaysexy', func: 'fadeOut', options: {onComplete: function() { this.advanceText(); }}},
	{ name: "???", dialogue: "...", background: 'bgstarry', music: 'main', func: 'fadeIn', options: {duration: 2000}},
	{ name: "???", dialogue: "You have used the SOUL OF COURAGE and the SOUL OF OPTIMISM to discover the truth of the universe."},
	{ name: "???", dialogue: "You have full access to the infinite complexities of the time-space continuum."},
	{ name: "???", dialogue: "What you do with this power is up to you."},
	{ name: "???", dialogue: "As long as you never forget one thing..."},
	{ name: "???", dialogue: "You are awake.", func: 'fadeOut', options: {duration: 3000, onComplete: function() { this.advanceText(); }}, advance: 'thankyou'},
	/* THANK YOU */ { label: 'thankyou', name: "@foolmoron", dialogue: "...", func: 'fadeIn'},
	{ name: "@foolmoron", dialogue: "Thanks for playing all the way to the end!"},
	{ name: "@foolmoron", dialogue: "Tell me what you think about the dating sim on twitter! #KawaiiAishiteruWormholeAdventure"},
	{ name: "@foolmoron", dialogue: "Keep a look out for the sequel, Kawaii Aishiteru Wormhole Adventure II..."},
	{ name: "@foolmoron", dialogue: "...otherwise known as... KAWAII"},
	{ name: "@foolmoron", dialogue: "Yeah, everything about this is dumb, I know...", music: '', cancelFastForward: true, func: 'fadeOut', options: {duration: 3000, onComplete: function() { this.state.start('startmenu'); }}, advance: null}
];

//lint the script lines to make sure there are no hard to find errors
(function(script) {
	var SCRIPT_LINE_IN_CODE = 28;
	var VALID_PROP_NAMES = [
		'label',
		'name',
		'dialogue',
		'background',
		'music',
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