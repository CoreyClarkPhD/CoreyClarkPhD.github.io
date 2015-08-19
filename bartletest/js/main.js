CQuestion = function(txt, options){
	this.question = txt;
	this.options = options;
}
COption = function(txt, cat, value){
	this.answer = txt;
	this.category = cat;
	this.value = value;
}



BartleGame = {
	Categories: {
		explorer: 0,
		achiever: 0,
		socializer: 0,
		killer: 0
	},
	Questions: [],
	Answers: [],
	totalAnswered: 0,
	Init: function(){
		BartleGame.LoadQuestions();
		BartleGame.LoadHTML();
	},
	LoadQuestions: function(){

		console.log("Loading Questions and Choices");
			//Question 1
		BartleGame.Answers[0] =[ new COption("Talking with friends in a tavern?", "socializer", 1),
				  				 new COption("Out hunting orcs by yourself for experience?", "achiever", 1) ];
		BartleGame.Questions[0] = new CQuestion("Are you more comfortable, as a player on a MMO", BartleGame.Answers[0]);

			//Qustion 2
		BartleGame.Answers[1] =[ new COption("Killing a big monster?", "achiever", 1),
				  				 new COption("Bragging about it to your friends", "socializer", 1) ];
		BartleGame.Questions[1] = new CQuestion("Which is more enjoyable to you", BartleGame.Answers[1]);
		
			//Question 3
		BartleGame.Answers[2] =[ new COption("Getting involved in the storyline", "socializer", 1),
				  				 new COption("Getting the rewards at the end", "achiever", 1) ];
		BartleGame.Questions[2] = new CQuestion("Which do you enjoy more in MMO quests", BartleGame.Answers[2]);	

			//Question 4
		BartleGame.Answers[3] =[ new COption("Your equipment", "achiever", 1),
				  				 new COption("Your personality", "socializer", 1) ];
		BartleGame.Questions[3] = new CQuestion("Which would you rather be noticed for on a MMO", BartleGame.Answers[3]);	
		
			//Question 5
		BartleGame.Answers[4] =[ new COption("Popular", "socializer", 1),
				  				 new COption("Wealthy", "achiever", 1) ];
		BartleGame.Questions[4] = new CQuestion("Would you rather be", BartleGame.Answers[4]);	

			//Question 6
		BartleGame.Answers[5] =[ new COption("Getting the latest gossip", "socializer", 1),
				  				 new COption("Getting a new item", "achiever", 1) ];
		BartleGame.Questions[5] = new CQuestion("Which do you enjoy more on a MMO", BartleGame.Answers[5]);	

			//Question 7
		BartleGame.Answers[6] =[ new COption("A private channel, over which you and your friends can communicate", "socializer", 1),
				  				 new COption("Your own house, worth millions of gold coins", "achiever", 1) ];
		BartleGame.Questions[6] = new CQuestion("Which would you rather have, as a player on a MMO", BartleGame.Answers[6]);	

			//Question 8
		BartleGame.Answers[7] =[ new COption("Running your own tavern", "socializer", 1),
				  				 new COption("Making your own maps of the world, then selling them", "explorer", 1) ];
		BartleGame.Questions[7] = new CQuestion("Which would you enjoy more as a MMO player", BartleGame.Answers[7]);	

			//Question 9
		BartleGame.Answers[8] =[ new COption("The number of people", "socializer", 1),
				  				 new COption("The number of areas to explore", "explorer", 1) ];
		BartleGame.Questions[8] = new CQuestion("What's more important in a MMO to you", BartleGame.Answers[8]);	

			//Question 10
		BartleGame.Answers[9] =[ new COption("The quality of roleplaying in a MMO", "socializer", 1),
				  				 new COption("The uniqueness of the features, and game mechanic", "explorer", 1) ];
		BartleGame.Questions[9] = new CQuestion("What's more important to you", BartleGame.Answers[9]);	

			//Question 11
		BartleGame.Answers[10] =[ new COption("Ask a friend for help in killing it", "socializer", 1),
				  				 new COption("Hide somewhere you know the monster won't follow", "explorer", 1) ];
		BartleGame.Questions[10] = new CQuestion("You are being chased by a monster on a MMO, Do you", BartleGame.Answers[10]);	

			//Question 12
		BartleGame.Answers[11] =[ new COption("Get a big group of players to kill it.", "socializer", 1),
				  				 new COption("Try a variety of weapons and magic against it, until you find its weakness.", "explorer", 1) ];
		BartleGame.Questions[11] = new CQuestion("You're a player on a MMO, and you want to fight a really tough dragon, How would you approach this problem?", BartleGame.Answers[11]);	

			//Question 13
		BartleGame.Answers[12] =[ new COption("A bard, who's a good friend of yours and who's great for entertaining you and your friends", "socializer", 1),
				  				 new COption("A wizard, to identify the items that you find there", "explorer", 1) ];
		BartleGame.Questions[12] = new CQuestion("You're a player on a MMO, and about to go into an unknown dungeon. You have your choice of one more person for your party.", BartleGame.Answers[12]);	

			//Question 14
		BartleGame.Answers[13] =[ new COption("Feared", "killer", 1),
				  				 new COption("Loved", "socializer", 1) ];
		BartleGame.Questions[13] = new CQuestion("Is it better to be:", BartleGame.Answers[13]);	

			//Question 15
		BartleGame.Answers[14] =[ new COption("Find out why, and try to convince them not to do it again", "socializer", 1),
				  				 new COption("Plot your revenge", "killer", 1) ];
		BartleGame.Questions[14] = new CQuestion("Someone has PK'ed you. Do you want to:", BartleGame.Answers[14]);

			//Question 16
		BartleGame.Answers[15] =[ new COption("A well-roleplayed scenario", "socializer", 1),
				  				 new COption("A deadly battle", "killer", 1) ];
		BartleGame.Questions[15] = new CQuestion("Which is more exciting", BartleGame.Answers[15]);

			//Question 17
		BartleGame.Answers[16] =[ new COption("Winning a duel with another player", "killer", 1),
				  				 new COption("Getting accepted by a clan", "socializer", 1) ];
		BartleGame.Questions[16] = new CQuestion("Which would you enjoy more", BartleGame.Answers[16]);

			//Question 18
		BartleGame.Answers[17] =[ new COption("Vanquish your enemies", "killer", 1),
				  				 new COption("Convince your enemies to work for you, not against you", "socializer", 1) ];
		BartleGame.Questions[17] = new CQuestion("Would you rather", BartleGame.Answers[17]);

			//Question 19
		BartleGame.Answers[18] =[ new COption("To be without power", "killer", 1),
				  				 new COption("To be without friends", "socializer", 1) ];
		BartleGame.Questions[18] = new CQuestion("What's worse", BartleGame.Answers[18]);

			//Question 20
		BartleGame.Answers[19] =[ new COption("Show them the sharp blade of your axe", "killer", 1),
				  				 new COption("Hear what someone has to say", "socializer", 1) ];
		BartleGame.Questions[19] = new CQuestion("Would you rather", BartleGame.Answers[19]);

			//Question 21
		BartleGame.Answers[20] =[ new COption("Exploring the new area, and finding out its history", "explorer", 1),
				  				 new COption("Being the first to get the new equipment from the area", "achiever", 1) ];
		BartleGame.Questions[20] = new CQuestion("On a MMO, a new area opens up. Which do you look forward to more?", BartleGame.Answers[20]);

			//Question 22
		BartleGame.Answers[21] =[ new COption("Someone who can run from any two points in the world, and really knows their way around.", "explorer", 1),
				  				 new COption("The person with the best, most unique equipment in the game", "achiever", 1) ];
		BartleGame.Questions[21] = new CQuestion("On a MMO, would you rather be known as:", BartleGame.Answers[21]);

			//Question 23
		BartleGame.Answers[22] =[ new COption("Know more secrets than your friends?", "explorer", 1),
				  				 new COption("Become a hero faster than your friends", "achiever", 1) ];
		BartleGame.Questions[22] = new CQuestion("Would you rather:", BartleGame.Answers[22]);

			//Question 24
		BartleGame.Answers[23] =[ new COption("Know where to find things", "explorer", 1),
				  				 new COption("Know how to get things?", "achiever", 1) ];
		BartleGame.Questions[23] = new CQuestion("Would you rather:", BartleGame.Answers[23]);

			//Question 25
		BartleGame.Answers[24] =[ new COption("Solve a riddle no one else has gotten", "explorer", 1),
				  				 new COption("Getting to a certain experience level faster than anyone else", "achiever", 1) ];
		BartleGame.Questions[24] = new CQuestion("Would you rather:", BartleGame.Answers[24]);

			//Question 26
		BartleGame.Answers[25] =[ new COption("Know things no one else does", "explorer", 1),
				  				 new COption("Have items no one else does", "achiever", 1) ];
		BartleGame.Questions[25] = new CQuestion("Do you tend to:", BartleGame.Answers[25]);

			//Question 27
		BartleGame.Answers[26] =[ new COption("Scholars", "explorer", 1),
				  				 new COption("Assassins", "achiever", 1) ];
		BartleGame.Questions[26] = new CQuestion("On a MMO, would rather join a clan of:", BartleGame.Answers[26]);

			//Question 28
		BartleGame.Answers[27] =[ new COption("A trivia contest", "explorer", 1),
				  				 new COption("An arena battle", "achiever", 1) ];
		BartleGame.Questions[27] = new CQuestion("Would you rather win:", BartleGame.Answers[27]);

			//Question 29
		BartleGame.Answers[28] =[ new COption("It's safe to explore", "explorer", 1),
				  				 new COption("You'll have to look elsewhere for prey", "killer", 1) ];
		BartleGame.Questions[28] = new CQuestion("If you're alone in an area, do you think:", BartleGame.Answers[28]);

			//Question 30
		BartleGame.Answers[29] =[ new COption("Knowledge", "explorer", 1),
				  				 new COption("Power", "killer", 1) ];
		BartleGame.Questions[29] = new CQuestion("On a MMO, would rather be known for", BartleGame.Answers[29]);

			//Question 31
		BartleGame.Answers[30] =[ new COption("Explore a new area", "explorer", 1),
				  				 new COption("Defeat an enemy", "killer", 1) ];
		BartleGame.Questions[30] = new CQuestion("Would you rather:", BartleGame.Answers[30]);

			//Question 32
		BartleGame.Answers[31] =[ new COption("Explore a new area", "explorer", 1),
				  				 new COption("Defeat an enemy", "killer", 1) ];
		BartleGame.Questions[31] = new CQuestion("Would you rather:", BartleGame.Answers[31]);

			//Question 33
		BartleGame.Answers[32] =[ new COption("Go to an area your opponent is unfamiliar with and prepare there", "explorer", 1),
				  				 new COption("Attack him before he attacks you", "killer", 1) ];
		BartleGame.Questions[32] = new CQuestion("You learn that another player is planning your demise. Do you:", BartleGame.Answers[32]);

			//Question 34
		BartleGame.Answers[33] =[ new COption("Someone who can appreciate your knowledge of the game", "explorer", 1),
				  				 new COption("As potential prey", "killer", 1) ];
		BartleGame.Questions[33] = new CQuestion("You meet a new player. Do you think of him as:", BartleGame.Answers[33]);

			//Question 35
		BartleGame.Answers[34] =[ new COption("Have a sword twice as powerful as any other in the game", "achiever", 1),
				  				 new COption("Be the most feared person in the game", "killer", 1) ];
		BartleGame.Questions[34] = new CQuestion("On a MMO, would you rather:", BartleGame.Answers[34]);

			//Question 36
		BartleGame.Answers[35] =[ new COption("Your equipment", "achiever", 1),
				  				 new COption("How may other players you've killed", "killer", 1) ];
		BartleGame.Questions[35] = new CQuestion("On a MMO, would you be more prone to brag about:", BartleGame.Answers[35]);

			//Question 37
		BartleGame.Answers[36] =[ new COption("A spell that increases the rate at which you gain experience points?", "achiever", 1),
				  				 new COption("A spell to damage other players", "killer", 1) ];
		BartleGame.Questions[36] = new CQuestion("Would you rather have:", BartleGame.Answers[36]);

			//Question 38
		BartleGame.Answers[37] =[ new COption("Two levels of experience", "achiever", 1),
				  				 new COption("An amulet that increases the damage you do against other players by 10%.", "killer", 1) ];
		BartleGame.Questions[37] = new CQuestion("Would you rather have:", BartleGame.Answers[37]);

			//Question 39
		BartleGame.Answers[38] =[ new COption("Experience points", "achiever", 1),
				  				 new COption("A wand with 3 charges of a spell that lets you control other players, against their will. (charm person)", "killer", 1) ];
		BartleGame.Questions[38] = new CQuestion("Would you rather receive as a quest reward:", BartleGame.Answers[38]);

			//Question 40
		BartleGame.Answers[39] =[ new COption("Have the highest score on the list?", "achiever", 1),
				  				 new COption("Beat your best friend one-on-one?", "killer", 1) ];
		BartleGame.Questions[39] = new CQuestion("When playing a video game, is it more fun to:", BartleGame.Answers[39]);

		console.log("Loaded " + BartleGame.Questions.length + " Questions");
	},
	LoadHTML: function(){
		BartleGame.AddHTMLQuestions();
		BartleGame.AddEventListeners();
	},
	AddEventListeners: function(){
		for(var i = 0; i < BartleGame.Questions.length; i++){
			document.getElementById('q'+i+'a0').addEventListener('click', BartleGame.ProccessClick, false);
			document.getElementById('q'+i+'a1').addEventListener('click', BartleGame.ProccessClick, false);
		}
	},
	AddHTMLQuestions: function(){
		html = "";
		for(var i = 0; i < BartleGame.Questions.length; i++){
			var id = i;
			var question = BartleGame.Questions[i].question;
			var option1 = BartleGame.Questions[i].options[0].answer;
			var option2 = BartleGame.Questions[i].options[1].answer;
			html += 	"<div id='"+ id +"' class='well'>" +
							'<div class="row">' +
							  '<div class="col-lg-12">' +
							  	'<blockquote>' +
							  		question +
							  	'</blockquote>' +
							  '</div>' +
							'</div>' +
							'<div class="row">' +
							  '<div class="col-md-12">' +
							  	'<button id="q'+ id +'a0" type="button" class="btn btn-primary btn-lg">' + option1  + '</button>' +
							  '</div>' +
							'</div>' +  
							'<div class="row">' +
							  '<div class="col-md-6">' +
							  	'<button id="q'+ id +'a1" type="button" class="btn btn-primary btn-lg">' + option2 + '</button>' +
							  '</div>' +
							'</div>' +
							'</div>' +
						'</div>';
		}

		document.getElementById('test').innerHTML = html;
	},
	ProccessClick: function(e){
		var id = e.currentTarget.id;
	
		var questionID = id.substring(1, id.indexOf('a'))|0;
		var answerID = id.substring(id.indexOf('a') + 1, id.length)|0;

		var question = BartleGame.Questions[questionID];
		BartleGame.Categories[question.options[answerID].category] += question.options[answerID].value;

		document.getElementById(questionID).style.display = "none";

		BartleGame.totalAnswered++;

		if(BartleGame.totalAnswered > 39){
			console.log("You are finished!");
			var cat = 0;
			var output = "";
			if(BartleGame.Categories.explorer > cat){
				cat =  BartleGame.Categories.explorer;
				output = "You Are An EXPLORER!"
			}
			if(BartleGame.Categories.achiever > cat){
				cat = BartleGame.Categories.achiever;
				output = "You Are An ACHIEVER!";

			}
			if(BartleGame.Categories.killer > cat){
				cat = BartleGame.Categories.killer;
				output = "You Are A KILLER!";

			}
			if(BartleGame.Categories.socializer > cat){
				cat = BartleGame.Categories.socializer;
				output = "You Are A SOCIALIZER!";

			}
			var html = "<h1>" + output + "</h1>";
			var exp = (BartleGame.Categories.explorer/40 * 100)|0;
			html += "<h2>Explorer: " + exp + "%<h2>";

			var ach = (BartleGame.Categories.achiever/40 * 100)|0 ;
			html += "<h2>Achiever: " + ach + "%<h2>";

			var kil = (BartleGame.Categories.killer/40 * 100)|0;
			html += "<h2>Killer: " + kil + "%<h2>";

			var soc = (BartleGame.Categories.socializer/40 * 100)|0
			html += "<h2>Socializer: " + soc + "%<h2>";

			document.getElementById('test').innerHTML = html;

		}
	}
}

BartleGame.Init();

