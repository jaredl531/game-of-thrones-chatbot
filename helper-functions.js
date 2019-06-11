// Global Data Variable
var characterList = {};
var shortNames = {};


/*
  Analyzes input from user and returns text for Sam to respond with
  Args:
    userInput - The question submitted by the user
  Returns:
  	String of text for Sam to respond with
*/
function doTextAnalysis(userInput) {
	var msg = userInput;
	var personOfInterest;
	var msgWords;
		
	// Remove question marks, trim and convert to lowercase
	msg = msg.trim();
	msg = msg.replace(/\?/gi, "");
	msg = msg.toLowerCase();
	
	// Split into individual words array
	msgWords = msg.split(" ");

	// First checks for "Hellos"
	if(msgWords.indexOf("hello") != -1 || msgWords.indexOf("hi") != -1 || msgWords.indexOf("hey") != -1) {
		return "Hello!";
	}
	
	// Check if they asked about Sam
	else if(msg.indexOf("who are you") != -1 || msg.indexOf("who is this") != -1) {
		return "I am Samwell Tarly!<br/><br/><img src='https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyODYyOTczMF5BMl5BanBnXkFtZTcwNjY0ODg4OQ@@._V1._SX100_SY140_.jpg'/>";
	}
	
	else {
		// We need to check certain question scenarios
		var personOfInterest = "";
		var startIndex, endIndex;
		
		// SCENARIO #1 - HOW DID SOMEONE DIE?
		if((msg.indexOf("who killed") != -1 || msg.indexOf("who kills") != -1) || ( (msg.indexOf("how did") != -1 || msg.indexOf("how does") != -1) && msg.indexOf("die") != -1 )) {
			console.log("Death Inquiry");
			
			// First check if they asked about Sam for some reason
			if(msg.indexOf("who killed you") != -1 || msg.indexOf("who killed samwell") != -1) {
				return "I am still alive obviously!";
			}
			
			// Store starting index via parsing
			if(msgWords.indexOf("killed") != -1 || msgWords.indexOf("kills") != -1) {
				startIndex = msgWords.indexOf("killed") != -1 ? msgWords.indexOf("killed") + 1 : msgWords.indexOf("kills") + 1
				endIndex = msgWords.length;
			}
			
			else {
				startIndex = msgWords.indexOf("did") != -1 ? msgWords.indexOf("did") + 1 : msgWords.indexOf("does") + 1;
				endIndex = msgWords.indexOf("die");
			}

			// get character name
			personOfInterest = getCharacterName(startIndex, endIndex, msgWords);
			
			// character match
			if(personOfInterest != "") {
				// Check if the person is actually dead
				if("killedBy" in characterList[personOfInterest]) {
					return personOfInterest + " was killed by " + characterList[personOfInterest].killedBy.join(', ').replace(/, (?!.*,)/gmi, ' and ');
				}
					
				else {
					return personOfInterest + " is actually still alive!";
				}
			}
			
			// no character match
			else {
				return "Unfortunately I am unfamiliar with this person";
			}
		}
	
		// SCENARIO #2 - LIST SOMEONE'S TOTAL KILLS
		else if((msg.indexOf("who did") != -1 || msg.indexOf("who does") != -1) && msgWords.indexOf("kill") != -1) {
			console.log("Death Count Question");
			// First check if they asked about Sam
			if(msg.indexOf("who did you kill") != -1 || msg.indexOf("who did samwell kill") != -1) {
				return "I killed a White Walker and Thenn Warg!";
			}
			
			// Store starting index via parsing
			startIndex = msgWords.indexOf("did") != -1 ? msgWords.indexOf("did") + 1 :  msgWords.indexOf("does") + 1;
			endIndex = msgWords.indexOf("kill");
			
			// get character name
			personOfInterest = getCharacterName(startIndex, endIndex, msgWords);
			
			// character match
			if(personOfInterest != "") {
				// Check to see if the person killed anyone
				if("killed" in characterList[personOfInterest]) {
					return personOfInterest + " killed " + characterList[personOfInterest].killed.join(', ').replace(/, (?!.*,)/gmi, ' and ');
				}
					
				else {
					return personOfInterest + " has never killed anybody.";
				}
			}
			
			// no character match
			else {
				return "Unfortunately I am unfamiliar with this person";
			}
		}
		
		// SCENARIO #3 - FAMILIAL RELATIONS
		else if(msgWords.indexOf("related") != -1) {
			console.log("Family Question");
			var familyString = "";
			
			// First check if they asked about Sam
			if(msg.indexOf("who are you related to") != -1 || msg.indexOf("who did samwell related to") != -1) {
				return "Here is my family information:<br/><br/>Spouse: Gilly<br/>Parents: Randyll Tarly and Melessa Tarly<br/>Siblings: Dickon Tarly and Talla Tarly<br/>Children: Baby Sam";
			}
			
			// Store starting index and "related" index
			var startIndex = msgWords.indexOf("is") + 1;
			var endIndex = msgWords.indexOf("related");
			
			// get character name
			personOfInterest = getCharacterName(startIndex, endIndex, msgWords);
			
			// character match
			if(personOfInterest != "") {
			
				// Check for entire family relations
				if("marriedEngaged" in characterList[personOfInterest]) {
					familyString += "Spouse: " + characterList[personOfInterest].marriedEngaged.join(', ').replace(/, (?!.*,)/gmi, ' and ') + "<br/>";
				}
				if("parents" in characterList[personOfInterest]) {
					familyString += "Parents: " + characterList[personOfInterest].parents.join(', ').replace(/, (?!.*,)/gmi, ' and ') + "<br/>";
				}
				if("siblings" in characterList[personOfInterest]) {
					familyString += "Siblings: " + characterList[personOfInterest].siblings.join(', ').replace(/, (?!.*,)/gmi, ' and ') + "<br/>";
				}
				if("parentOf" in characterList[personOfInterest]) {
					familyString += "Children: " + characterList[personOfInterest].parentOf.join(', ').replace(/, (?!.*,)/gmi, ' and ') + "<br/>";
				}
				
				if(familyString != "") {
					return "Here is " + personOfInterest + "'s family information:<br/><br/>" + familyString;
				}
				else {
					return personOfInterest + " has no family records here."
				}
			}
			
			// no character match
			else {
				return "Unfortunately I am unfamiliar with this person";
			}
		}
		
		// SCENARIO #4 - ACTOR/ACTRESS
		else if(msgWords.indexOf("plays") != -1 || msgWords.indexOf("played") != -1) {
			console.log("Actor Question");
			var actorArray = [];
			
			// First check if they asked about Sam
			if(msg.indexOf("who played you") != -1 || msg.indexOf("who plays you") != -1) {
				return "I am played by John Bradley";
			}
			
			// Store starting index
			msgWords.indexOf("plays") != -1 ? startIndex = msgWords.indexOf("plays") + 1 : startIndex = msgWords.indexOf("played") + 1;

			// end index simply last word
			endIndex = msgWords.length;
			
			// get character name
			personOfInterest = getCharacterName(startIndex, endIndex, msgWords);
			
			// character match
			if(personOfInterest != "") {
				// Check for multiple actors
				if("actors" in characterList[personOfInterest]) {
					for(var item in characterList[personOfInterest]["actors"]) {
						actorArray.push("<a href=http://www.imdb.com" + characterList[personOfInterest]["actors"][item].actorLink + " target='_blank'>" + characterList[personOfInterest]["actors"][item].actorName + "</a>");
					}
				}
				
				// one actor
				else {
						actorArray.push("<a href=http://www.imdb.com" + characterList[personOfInterest].actorLink + " target='_blank'>" + characterList[personOfInterest].actorName + "</a>");
				}
				
				return personOfInterest + " was played by " + actorArray.join(', ').replace(/, (?!.*,)/gmi, ' and ');
			}
			
			// no match found
			else {
				return "Unfortunately I am unfamiliar with this person";
			}
		}
		
		// SCENARIO #5 - WHO IS THIS PERSON?
		else if(msg.indexOf("who is") != -1 || msg.indexOf("show me") != -1) {
			console.log("Image Question");
			
			// Store starting index
			msgWords.indexOf("is") != -1 ? startIndex = msgWords.indexOf("is") + 1 : startIndex = msgWords.indexOf("me") + 1;

			// end index simply last word
			endIndex = msgWords.length;
			
			// get character name
			personOfInterest = getCharacterName(startIndex, endIndex, msgWords);
			
			// character match
			if(personOfInterest != "") {
				// Check for multiple actors
				if("characterImageThumb" in characterList[personOfInterest]) {
					return "This is " + personOfInterest + "<br/><br/><img src='" + characterList[personOfInterest].characterImageThumb + "'/>";
				}
				
				else {
					return "There are no images on file for " + personOfInterest;
				}
			}
			
			// no match found
			else {
				return "Unfortunately I am unfamiliar with this person";
			}
		}
	}
	
	// Default response
	return "I'm afraid I don't have the answer to this!";
}



/*
  Loads character information from JSON file on page load
  Stores in dictionary for more efficient searching later
  Args:
  	data - JSON input
*/
function loadCharacterInformation(data) {
	// traverse through list of characters and store them in two dictionaries, one with all info and one with nicknames
	for(var i=0; i < data.characters.length; i++) {
	
		// Big dictionary
		characterList[data.characters[i].characterName] = data.characters[i];
		
		// For the short names, store their nickname or simply their first name
		if(data.characters[i].nickname) {
			shortNames[data.characters[i].nickname] = data.characters[i].characterName;
		}
		
		else {
			shortNames[data.characters[i].characterName.split(" ")[0]] = data.characters[i].characterName;
		}
	}
	
	// Add Jaime and Petyr since they have nicknames and also common first names. And Ned since "Eddard" is his listed name.
	shortNames["Jaime"] = "Jaime Lannister";
	shortNames["Petyr"] = "Petyr Baelish";
	shortNames["Ned"] = "Eddard Stark";

  console.log(characterList);
  console.log(shortNames);
}



/*
	Formats character names to keep them consistent with JSON Dataset. Also trims any spaces.
	Args:
		startIndex - start index of MsgWords array
		endIndex - end index of MsgWords array
		msgWords - array of words entered by the user
	Returns:
		A string representing the character's name, or blank if they are not found
*/
function getCharacterName(startIndex, endIndex, msgWords) {
	var character = "";
	
	// Capitalize all words that either lead the name or are not "the" or "of"
	// This is so that we keep it consistent with the JSON dataset
	for(var i = startIndex; i < endIndex; i++) {
		if(i == startIndex || (msgWords[i] != "of" && msgWords[i] != "the")) {
			character += capitalize(msgWords[i]) + " ";
		}
		else {
			chracter += msgWords[i] + " ";
		}
	}
			
	character = character.trim();
	
	// Look through dictionaries for character match
	if(characterList[character]) {
	  return character;
	}
	else if(shortNames[character]) {
		return shortNames[character];
	}
	
	// character not found
	return "";
}



/*
  Returns a random image for the body background from a folder of images
  Args:
  	None
*/
function chooseRandomBackgroundPic() {
	var num = Math.ceil( Math.random() * 10 );
	document.body.background = 'Images/Backgrounds/throne' + num + ".png";
}



/*
  Purpose: Return a capitalized String
  Args:
    s - A String
*/
function capitalize(s)
{
  return s[0].toUpperCase() + s.slice(1);
}
