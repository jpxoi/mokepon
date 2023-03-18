# Summary

This code is for a JavaScript game that uses the HTML canvas to display the game board and components. The code uses a class Mokepon to create three instances of creatures named hipodoge, capipepo, and ratigueya. The game has different sections (e.g. sectionRestart, sectionSelectPet, etc.) that are displayed or hidden based on the player's progress. The game keeps track of the player's and enemy's selected creatures and their respective attacks. The game also keeps track of the player's and enemy's victories. The canvas object is used to draw the game board and the creatures on it.

# Installation

Currently, there are two versions available to play. The version you choose is going to depend on your coding and basic local networking knowledge.

## Single-Player Version

The single-player version of this game is available at https://mokepon.jpxoi.com

However, if you prefer to play an offline version of the game, you can download the `Source code.zip`file of your preferred single-player version from [here](https://github.com/jpxoi/mokepon/releases).

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c48cd98-25fb-4a15-8696-b66679e01351/deploy-status)](https://app.netlify.com/sites/mokepon-byjpxoi/deploys)

## Multiplayer Version

### Prerequisites

* `NodeJS` - Available at https://nodejs.org/en/
* `Express Framework` - Available at https://expressjs.com

### Process

To properly install the multiplayer version of this game perform the following instructions.

1. Download the `Source code.zip` file of your preferred multiplayer version from [here](https://github.com/jpxoi/mokepon/releases), and save it to your preferred folder.
2. Install `NodeJS` from its official website before continuing with the process.
3. Open a terminal in the folder where you saved the GitHub repository, and install the `Express Framework` via npm with `$ npm install express --save`
4. Open the `/assets/js/script.js` file with your preferred code editor, and replace the `http://Jean-Pauls-MacBook-Air.local:8080` value, with `http://<yourlocalipaddress>:8080`.
  * To get your local IP address, open a terminal instance and run the `hostname` (MacOS and Linus) or `ipconfig` (Windows) command. You can also use your hostname, which should look like `<computername>.local`.
5. Open a new terminal in the main folder, and run one of the following commands.
```
$ npm run start
$ npm node index.js
```

This should initialize the server, and you should be able to access the game from any computer or phone on your local network at `http://<yourlocalipadress>:8080` or at `http://<computername>.local:8080`.

To terminate your server just press `Control` + `C`.
