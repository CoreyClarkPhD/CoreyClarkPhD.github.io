CQuestion = function(txt, options){
	this.question = txt;
	this.options = options;
}
COption = function(txt, cat, value){
	this.answer = txt;
	this.category = cat;
	this.value = value;
}



BattleGame = {
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
		BattleGame.LoadQuestions();
		BattleGame.LoadHTML();
	},
	LoadQuestions: function(){

		console.log("Loading Questions and Choices");
			//Question 1
		BattleGame.Answers[0] =[ new COption("Talking with friends in a tavern?", "socializer", 1),
				  				 new COption("Out hunting orcs by yourself for experience?", "achiever", 1) ];
		BattleGame.Questions[0] = new CQuestion("Are you more comfortable, as a player on a MMO", BattleGame.Answers[0]);

			//Qustion 2
		BattleGame.Answers[1] =[ new COption("Killing a big monster?", "achiever", 1),
				  				 new COption("Bragging about it to your friends", "socializer", 1) ];
		BattleGame.Questions[1] = new CQuestion("Which is more enjoyable to you", BattleGame.Answers[1]);
		
			//Question 3
		BattleGame.Answers[2] =[ new COption("Getting involved in the storyline", "socializer", 1),
				  				 new COption("Getting the rewards at the end", "achiever", 1) ];
		BattleGame.Questions[2] = new CQuestion("Which do you enjoy more in MMO quests", BattleGame.Answers[2]);	

			//Question 4
		BattleGame.Answers[3] =[ new COption("Your equipment", "achiever", 1),
				  				 new COption("Your personality", "socializer", 1) ];
		BattleGame.Questions[3] = new CQuestion("Which would you rather be noticed for on a MMO", BattleGame.Answers[3]);	
		
			//Question 5
		BattleGame.Answers[4] =[ new COption("Popular", "socializer", 1),
				  				 new COption("Wealthy", "achiever", 1) ];
		BattleGame.Questions[4] = new CQuestion("Would you rather be", BattleGame.Answers[4]);	

			//Question 6
		BattleGame.Answers[5] =[ new COption("Getting the latest gossip", "socializer", 1),
				  				 new COption("Getting a new item", "achiever", 1) ];
		BattleGame.Questions[5] = new CQuestion("Which do you enjoy more on a MMO", BattleGame.Answers[5]);	

			//Question 7
		BattleGame.Answers[6] =[ new COption("A private channel, over which you and your friends can communicate", "socializer", 1),
				  				 new COption("Your own house, worth millions of gold coins", "achiever", 1) ];
		BattleGame.Questions[6] = new CQuestion("Which would you rather have, as a player on a MMO", BattleGame.Answers[6]);	

			//Question 8
		BattleGame.Answers[7] =[ new COption("Running your own tavern", "socializer", 1),
				  				 new COption("Making your own maps of the world, then selling them", "explorer", 1) ];
		BattleGame.Questions[7] = new CQuestion("Which would you enjoy more as a MMO player", BattleGame.Answers[7]);	

			//Question 9
		BattleGame.Answers[8] =[ new COption("The number of people", "socializer", 1),
				  				 new COption("The number of areas to explore", "explorer", 1) ];
		BattleGame.Questions[8] = new CQuestion("What's more important in a MMO to you", BattleGame.Answers[8]);	

			//Question 10
		BattleGame.Answers[9] =[ new COption("The quality of roleplaying in a MMO", "socializer", 1),
				  				 new COption("The uniqueness of the features, and game mechanic", "explorer", 1) ];
		BattleGame.Questions[9] = new CQuestion("What's more important to you", BattleGame.Answers[9]);	

			//Question 11
		BattleGame.Answers[10] =[ new COption("Ask a friend for help in killing it", "socializer", 1),
				  				 new COption("Hide somewhere you know the monster won't follow", "explorer", 1) ];
		BattleGame.Questions[10] = new CQuestion("You are being chased by a monster on a MMO, Do you", BattleGame.Answers[10]);	

			//Question 12
		BattleGame.Answers[11] =[ new COption("Get a big group of players to kill it.", "socializer", 1),
				  				 new COption("Try a variety of weapons and magic against it, until you find its weakness.", "explorer", 1) ];
		BattleGame.Questions[11] = new CQuestion("You're a player on a MMO, and you want to fight a really tough dragon, How would you approach this problem?", BattleGame.Answers[11]);	

			//Question 13
		BattleGame.Answers[12] =[ new COption("A bard, who's a good friend of yours and who's great for entertaining you and your friends", "socializer", 1),
				  				 new COption("A wizard, to identify the items that you find there", "explorer", 1) ];
		BattleGame.Questions[12] = new CQuestion("You're a player on a MMO, and about to go into an unknown dungeon. You have your choice of one more person for your party.", BattleGame.Answers[12]);	

			//Question 14
		BattleGame.Answers[13] =[ new COption("Feared", "killer", 1),
				  				 new COption("Loved", "socializer", 1) ];
		BattleGame.Questions[13] = new CQuestion("Is it better to be:", BattleGame.Answers[13]);	

			//Question 15
		BattleGame.Answers[14] =[ new COption("Find out why, and try to convince them not to do it again", "socializer", 1),
				  				 new COption("Plot your revenge", "killer", 1) ];
		BattleGame.Questions[14] = new CQuestion("Someone has PK'ed you. Do you want to:", BattleGame.Answers[14]);

			//Question 16
		BattleGame.Answers[15] =[ new COption("A well-roleplayed scenario", "socializer", 1),
				  				 new COption("A deadly battle", "killer", 1) ];
		BattleGame.Questions[15] = new CQuestion("Which is more exciting", BattleGame.Answers[15]);

			//Question 17
		BattleGame.Answers[16] =[ new COption("Winning a duel with another player", "killer", 1),
				  				 new COption("Getting accepted by a clan", "socializer", 1) ];
		BattleGame.Questions[16] = new CQuestion("Which would you enjoy more", BattleGame.Answers[16]);

			//Question 18
		BattleGame.Answers[17] =[ new COption("Vanquish your enemies", "killer", 1),
				  				 new COption("Convince your enemies to work for you, not against you", "socializer", 1) ];
		BattleGame.Questions[17] = new CQuestion("Would you rather", BattleGame.Answers[17]);

			//Question 19
		BattleGame.Answers[18] =[ new COption("To be without power", "killer", 1),
				  				 new COption("To be without friends", "socializer", 1) ];
		BattleGame.Questions[18] = new CQuestion("What's worse", BattleGame.Answers[18]);

			//Question 20
		BattleGame.Answers[19] =[ new COption("Show them the sharp blade of your axe", "killer", 1),
				  				 new COption("Hear what someone has to say", "socializer", 1) ];
		BattleGame.Questions[19] = new CQuestion("Would you rather", BattleGame.Answers[19]);

			//Question 21
		BattleGame.Answers[20] =[ new COption("Exploring the new area, and finding out its history", "explorer", 1),
				  				 new COption("Being the first to get the new equipment from the area", "achiever", 1) ];
		BattleGame.Questions[20] = new CQuestion("On a MMO, a new area opens up. Which do you look forward to more?", BattleGame.Answers[20]);

			//Question 22
		BattleGame.Answers[21] =[ new COption("Someone who can run from any two points in the world, and really knows their way around.", "explorer", 1),
				  				 new COption("The person with the best, most unique equipment in the game", "achiever", 1) ];
		BattleGame.Questions[21] = new CQuestion("On a MMO, would you rather be known as:", BattleGame.Answers[21]);

			//Question 23
		BattleGame.Answers[22] =[ new COption("Know more secrets than your friends?", "explorer", 1),
				  				 new COption("Become a hero faster than your friends", "achiever", 1) ];
		BattleGame.Questions[22] = new CQuestion("Would you rather:", BattleGame.Answers[22]);

			//Question 24
		BattleGame.Answers[23] =[ new COption("Know where to find things", "explorer", 1),
				  				 new COption("Know how to get things?", "achiever", 1) ];
		BattleGame.Questions[23] = new CQuestion("Would you rather:", BattleGame.Answers[23]);

			//Question 25
		BattleGame.Answers[24] =[ new COption("Solve a riddle no one else has gotten", "explorer", 1),
				  				 new COption("Getting to a certain experience level faster than anyone else", "achiever", 1) ];
		BattleGame.Questions[24] = new CQuestion("Would you rather:", BattleGame.Answers[24]);

			//Question 26
		BattleGame.Answers[25] =[ new COption("Know things no one else does", "explorer", 1),
				  				 new COption("Have items no one else does", "achiever", 1) ];
		BattleGame.Questions[25] = new CQuestion("Do you tend to:", BattleGame.Answers[25]);

			//Question 27
		BattleGame.Answers[26] =[ new COption("Scholars", "explorer", 1),
				  				 new COption("Assassins", "achiever", 1) ];
		BattleGame.Questions[26] = new CQuestion("On a MMO, would rather join a clan of:", BattleGame.Answers[26]);

			//Question 28
		BattleGame.Answers[27] =[ new COption("A trivia contest", "explorer", 1),
				  				 new COption("An arena battle", "achiever", 1) ];
		BattleGame.Questions[27] = new CQuestion("Would you rather win:", BattleGame.Answers[27]);

			//Question 29
		BattleGame.Answers[28] =[ new COption("It's safe to explore", "explorer", 1),
				  				 new COption("You'll have to look elsewhere for prey", "killer", 1) ];
		BattleGame.Questions[28] = new CQuestion("If you're alone in an area, do you think:", BattleGame.Answers[28]);

			//Question 30
		BattleGame.Answers[29] =[ new COption("Knowledge", "explorer", 1),
				  				 new COption("Power", "killer", 1) ];
		BattleGame.Questions[29] = new CQuestion("On a MMO, would rather be known for", BattleGame.Answers[29]);

			//Question 31
		BattleGame.Answers[30] =[ new COption("Explore a new area", "explorer", 1),
				  				 new COption("Defeat an enemy", "killer", 1) ];
		BattleGame.Questions[30] = new CQuestion("Would you rather:", BattleGame.Answers[30]);

			//Question 32
		BattleGame.Answers[31] =[ new COption("Explore a new area", "explorer", 1),
				  				 new COption("Defeat an enemy", "killer", 1) ];
		BattleGame.Questions[31] = new CQuestion("Would you rather:", BattleGame.Answers[31]);

			//Question 33
		BattleGame.Answers[32] =[ new COption("Go to an area your opponent is unfamiliar with and prepare there", "explorer", 1),
				  				 new COption("Attack him before he attacks you", "killer", 1) ];
		BattleGame.Questions[32] = new CQuestion("You learn that another player is planning your demise. Do you:", BattleGame.Answers[32]);

			//Question 34
		BattleGame.Answers[33] =[ new COption("Someone who can appreciate your knowledge of the game", "explorer", 1),
				  				 new COption("As potential prey", "killer", 1) ];
		BattleGame.Questions[33] = new CQuestion("You meet a new player. Do you think of him as:", BattleGame.Answers[33]);

			//Question 35
		BattleGame.Answers[34] =[ new COption("Have a sword twice as powerful as any other in the game", "achiever", 1),
				  				 new COption("Be the most feared person in the game", "killer", 1) ];
		BattleGame.Questions[34] = new CQuestion("On a MMO, would you rather:", BattleGame.Answers[34]);

			//Question 36
		BattleGame.Answers[35] =[ new COption("Your equipment", "achiever", 1),
				  				 new COption("How may other players you've killed", "killer", 1) ];
		BattleGame.Questions[35] = new CQuestion("On a MMO, would you be more prone to brag about:", BattleGame.Answers[35]);

			//Question 37
		BattleGame.Answers[36] =[ new COption("A spell that increases the rate at which you gain experience points?", "achiever", 1),
				  				 new COption("A spell to damage other players", "killer", 1) ];
		BattleGame.Questions[36] = new CQuestion("Would you rather have:", BattleGame.Answers[36]);

			//Question 38
		BattleGame.Answers[37] =[ new COption("Two levels of experience", "achiever", 1),
				  				 new COption("An amulet that increases the damage you do against other players by 10%.", "killer", 1) ];
		BattleGame.Questions[37] = new CQuestion("Would you rather have:", BattleGame.Answers[37]);

			//Question 39
		BattleGame.Answers[38] =[ new COption("Experience points", "achiever", 1),
				  				 new COption("A wand with 3 charges of a spell that lets you control other players, against their will. (charm person)", "killer", 1) ];
		BattleGame.Questions[38] = new CQuestion("Would you rather receive as a quest reward:", BattleGame.Answers[38]);

			//Question 40
		BattleGame.Answers[39] =[ new COption("Have the highest score on the list?", "achiever", 1),
				  				 new COption("Beat your best friend one-on-one?", "killer", 1) ];
		BattleGame.Questions[39] = new CQuestion("When playing a video game, is it more fun to:", BattleGame.Answers[39]);

		console.log("Loaded " + BattleGame.Questions.length + " Questions");
	},
	LoadHTML: function(){
		BattleGame.AddHTMLQuestions();
		BattleGame.AddEventListeners();
	},
	AddEventListeners: function(){
		for(var i = 0; i < BattleGame.Questions.length; i++){
			document.getElementById('q'+i+'a0').addEventListener('click', BattleGame.ProccessClick, false);
			document.getElementById('q'+i+'a1').addEventListener('click', BattleGame.ProccessClick, false);
		}
	},
	AddHTMLQuestions: function(){
		html = "";
		for(var i = 0; i < BattleGame.Questions.length; i++){
			var id = i;
			var question = BattleGame.Questions[i].question;
			var option1 = BattleGame.Questions[i].options[0].answer;
			var option2 = BattleGame.Questions[i].options[1].answer;
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

		var question = BattleGame.Questions[questionID];
		BattleGame.Categories[question.options[answerID].category] += question.options[answerID].value;

		document.getElementById(questionID).style.display = "none";

		BattleGame.totalAnswered++;

		if(BattleGame.totalAnswered > 39){
			console.log("You are finished!");
			var cat = 0;
			var output = "";
			if(BattleGame.Categories.explorer > cat){
				cat =  BattleGame.Categories.explorer;
				output = "You Are An EXPLORER!"
			}
			else if(BattleGame.Categories.achiever > cat){
				cat = BattleGame.Categories.achiever;
				output = "You Are An ACHIEVER!";

			}
			else if(BattleGame.Categories.killer > cat){
				cat = BattleGame.Categories.killer;
				output = "You Are A KILLER!";

			}
			else if(BattleGame.Categories.socializer > cat){
				cat = BattleGame.Categories.socializer;
				output = "You Are A SOCIALIZER!";

			}

			document.getElementById('test').innerHTML = "<h1>" + output + "</h1>";

		}
	}
}

BattleGame.Init();

