# Game of Thrones Chatbot
A simple UI and chatbot to help answer many Game of Thrones-related inquiries! The code uses PubNub's API to publish and subscribe to the chats and a dataset from [@jeffreylancaster](https://github.com/jeffreylancaster) to search and lookup all of the data. You can view some more of his awesome GoT datasets and visualizations [here]( https://github.com/jeffreylancaster/game-of-thrones).

<img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/Github-Readme/full-screen.png"/>

## How to get started
The code is completely client-side so all you'll need to do is download the repo, throw it in a cloud folder and call index.html. You'll probably want to generate your own [PubNub API Keys](https://www.pubnub.com/docs/pubnub-rest-api-documentation) for this so that you can view all chats in your own, personal console.

A live demo can also be found <a href="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/index.html" target="_blank">here</a> if you want to see it in action right away.

## Usage

The chatbot has been preloaded with the ability to answer questions about the following categories. Note that either first names, first + last names or even nicknames (e.g. The Hound) can be recognized usually.


*** SPOILERS BELOW!!! ***


### Deaths <img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/Github-Readme/killing-questions2.png" width="450" align="right"/>

Pretty much everyone who died and who did it to them.

1. Who killed _________? 

2. How did/does _________ die?

3. Who did/does _________ kill?

<br/><br/>

### Familial Relations<img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/Github-Readme/relations-questions2.png" width="450" align="right"/>

Note that this only covers parents, spouses, siblings and children. Sadly aunts are not on here, Jon.

4. Who is _________ related to? 

5. To whom is _______ related?

<br/><br/>

### Actors/Actresses <img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/Github-Readme/actor-questions.png" width="450" align="right"/>

The names of the actors or actresses who played a certain character and links to their IMDB pages. If more than one actor/actress played a character (e.g. The Night King) all of them will display.

6. Who plays/played __________?

<br/><br/>

### Who is who <img src="https://jared-hack-projects.s3.us-east-2.amazonaws.com/game-of-thrones-chat/Github-Readme/visual-question.png" width="450" align="right"/>

Visual responses that show you who a character is

7. Who is __________?

8. Show me _________.

<br/><br/>
## Other Features

The page is set to randomly choose one of 10 pre-loaded background images, and if you click on the Stark logo in the top left it'll pick a new one for you instantaneously. 

Of course, there's also music in the bottom left corner and you can stop and start that as you'd like.

Looking to add more features to this soon so stay on the lookout for that!
