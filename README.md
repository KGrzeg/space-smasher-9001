# SPACE SMASHER 9001!

Tested on node `v14.17.3`

You can play the game [here](https://mystifying-hypatia-4b1cef.netlify.app/) (unfortunelly I can not setup server, so this instance do not provides ranking 😥).
Please be patient. The game **will** load, but slower on the crappy, free hosting, than on localhost.

The game was created for the first edition of [Hackerspace Trójmiasto's Community](https://github.com/hs3city/hs3-jam) Jam.

![Screenshot](ss.jpg)

## How to start a game

You need the [NodeJS](https://nodejs.org/en/) installed.

The game's server do not serve game client's files. They are separately apps.
The server is responsible for authentication and storing records.
Data is stored as plain JSON files in `server/storage` directory.
You do not have to setup any external database :)

The game *should* work without server, with some limitations.
Game works fine on desktop

Steering: `WSAD + Mouse`

## Setup and run server
```sh
🐧 cd server
🐧 npm install # install dependencies
🐧 cp .env.example .env
🐧 # edit .env file - UPDATE THE SECRET!
🐧 npm start # the server listening on port 3000. 
```

## Setup and run client
```sh
🐧 cd .. # only if your cwd is server directory
🐧 cd game
🐧 npm install # install dependencies
🐧 # edit first line of src/api.ts to match your server
🐧 npm start # to run in Dev mode (hot reloading and recompilling)
🐧 npm run build
🐧 # your app is in dist directory, you need to serve it via www server
```

## Enjoy!
