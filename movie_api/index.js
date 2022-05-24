const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

    // Create a write stream (in appen mode)
    // A "log.txt" file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

    let movies = [
        {
            title: 'Predator',
            director: 'John McTiernan'
        },
        {
            title: 'Commando',
            director: 'Mark L. Lester'
        },
        {
            title: 'Lethal Weapon',
            director: 'Richard Donner'
        },
        {
            title: 'Die Hard',
            director: 'John McTiernan'
        },
        {
            title: 'Ghostbusters',
            director: 'Ivan Reitman'
        },
        {
            title: 'The Burbs',
            director: 'Joe Dante'
        },
        {
            title: 'Big',
            director: 'Penny Marshall'
        },
        {
            title: 'Flight of the Navigator',
            director: 'Randal Kleiser'
        },
        {
            title: 'Alien',
            director: 'Ridley Scott'
        },
        {
            title: 'Aliens',
            director: 'James Cameron'
        },
        {
            title: 'The Abyss',
            director: 'James Cameron'
        },
    ];

    // Get requests
    app.get('/', (req, res) => {
        res.send('Swagflix coming soon!');
    });

    app.get('/movies', (req, res) => {
        res.json(movies);
    });
    
    // Setup the logger middleware
    app.use(morgan('combined', {stream: accessLogStream}));

    // Sends static files to log.txt
    app.use(express.static('public'));

    // Error handling
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    // Listen for requests
    app.listen(8080, () => {
        console.log("I'm running!");
    });