var path = require('path')
var express = require('express')
const exphbs = require('express-handlebars');
var app = express()
var port = process.env.PORT || 3333

const fs = require('fs') //Allows me to read or change files
var charData = require('./server_data/characters.json')
var gameData = require('./server_data/gameInfo.json')
var playerData = require('./server_data/charactersPicked.json')

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

app.use(express.static('static'));

app.use(express.json()); // To parse JSON requests, may not be needed

// Serves the default (or main) page
app.get('/', function (req, res) {
    res.status(200).render('menu', { noHeader: true });
}) 

// Serves the main game page
app.get('/game', function (req, res) {
    res.status(200).render('game');
    //res.status(200).sendFile(path.join(__dirname, 'index.html'))
    
})
app.get('/credits', function (req, res) {
    res.status(200).render('credits');
    
})

function formatAsPercentage(num) {
  return new Intl.NumberFormat('default', {
    style: 'percent',
  }).format(num);
}

app.get('/stats', function (req, res) {
    fs.readFile('./server_data/gameInfo.json', 'utf-8', (err, data) => {
        let gameObj = JSON.parse(data);
        let numGames = gameObj['numGames'];

        fs.readFile('./server_data/characters.json', 'utf-8', (err, data) => {
            let charObj = JSON.parse(data)

            Object.values(charObj).forEach(value => {
                if (value['numPicks'] > 0) {
                    value['numWins'] = formatAsPercentage(value['numWins'] / value['numPicks']);
                } else {
                    value['numWins'] = formatAsPercentage(0)
                }

                if (numGames > 0) {
                    value['numPicks'] = formatAsPercentage(value['numPicks'] / (numGames * 2));
                } else {
                    value['numPicks'] = formatAsPercentage(0)
                }
            })

            res.status(200).render('stats', {entries: charObj});
        })
    })
}) 

app.get('/characterselect', function (req, res) {
    res.status(200).render('characterselect', {entries: charData})
}) 

// Get charactersPicked.json file
app.get('/server_data/charactersPicked.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'server_data', 'charactersPicked.json'));
});

// 404 Page
app.get('*', function (req, res) {
    res.status(200).render('404')
})

// When a character is picked from character select screen
app.post('/data/charactersPicked', function (req, res) {
    // Stores the data of the two characters picked
    if (req.body && req.body.playerName && req.body.characterName) {
        playerData[req.body.playerName] = req.body.characterName;

        fs.writeFile('server_data/charactersPicked.json', JSON.stringify(playerData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error saving data");
            } else {
                res.status(200).send("Player info saved successfully");
            }
        })

    } else {
        res.status(400).send("Error");
    }
})

// When a character has won a game
app.post('/data/characterDataUpdate', function (req, res) {
    if (req.body && req.body.winner && req.body.loser) {
        
        // Updates all the relevant data
        charData[req.body.winner].numWins += 1;
        charData[req.body.winner].numPicks += 1;
        charData[req.body.loser].numPicks += 1;
        gameData.numGames += 1;

        // Writes updated data to relevant files
        fs.writeFile('server_data/characters.json', JSON.stringify(charData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving data");
            }
        })

        fs.writeFile('server_data/gameInfo.json', JSON.stringify(gameData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving data");
            }
        })

        res.status(200).send("Data saved successfully");

    } else {
        res.status(400).send("Error");
    }
})

// Sets up the server
app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
