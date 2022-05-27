const express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

  // Log data
app.use(morgan('common'));

  // Sends static files to log.txt
app.use(express.static('public'));

let users = [
        {
            id: 1,
            name: 'John McClain',
            favoriteMovies: ['Die Hard']
        },
        {
            id: 2,
            name: 'Dutch',
            favoriteMovies: ['Predator']
        },
        {
            id: 3,
            name: 'Martin Riggs',
            favoriteMovies: ['Lethal Weapon']
        },
        {
            id: 4,
            name: 'Roger Murtaw',
            favoriteMovies: ['Lethal Weapon']
        }
]


let movies = [
        {
            title: 'Predator',
            description: 'The hunt is on!',
            director: {
                name: 'John McTiernan',
                bio: 'Directed by favorite childhood movie'
            },
            genre: {
                name: 'Action',
                description: 'Guns a blazin'
            },
            img: ''
        },
        {
            title: 'Commando',
            description: "Don't ever kidnap a man's daughter!",
            director: {
                name: 'Mark L. Lester',
                bio: 'Directed my second favorite childhood movie!'
            },
            genre: {
                name: 'Action',
                description: 'Guns a blazin'
            },
            img: ''
        },
        {
            title: 'Lethal Weapon',
            description: 'These guys cannot be stopped!',
            director: {
                name: 'Richard Donner',
                bio: 'He directed lethal weapon.'
            },
            genre: {
                name: 'Action',
                description: 'Guns a blazin'
            },
            img: ''
        },
        {
            title: 'Die Hard',
            description: "He just doesn't die!",
            director: {
                name: 'John McTiernan',
                bio: 'He directed Die Hard.'
            },
            genre: {
                name: 'Action',
                description: 'Guns a blazin'
            },
            img: ''
        },
        {
            title: 'Ghostbusters',
            description: 'Who you gonna call?',
            director: {
                name: 'Ivan Reitman',
                bio: 'He directed ghostbusters.'
            },
            genre: {
                name: 'Comedy',
                description: 'Its funny!'
            },
            img: ''
        },
        {
            title: 'The Burbs',
            description: 'You cannot trust your neighbors!',
            director: {
                name: 'Joe Dante',
                bio: 'He directed Tom Hanks before he was Tom Hanks.'
            },
            genre: {
                name: 'Comedy',
                description: 'Its funny!'
            },
            img: ''
        },
        {
            title: 'Big',
            description: 'Careful what you wish for!',
            director: {
                name: 'Penny Marshall',
                bio: 'He directed Big.'
            },
            genre: {
                name: 'Comedy',
                description: 'Its funny!'
            },
            img: ''
        },
        {
            title: 'Flight of the Navigator',
            description: 'It would be sooo awesome to take over a ufo!',
            director: {
                name: 'Randal Kleiser',
                bio: 'He directed this movie.'
            },
            genre: {
                name: 'Suspense',
                description: 'You are afraid to look away!'
            },
            img: ''
        },
        {
            title: 'Alien',
            description: 'For the love of god! Do not look into a giant egg! Nothing nice comes out!',
            director: {
                name: 'Ridley Scott',
                bio: 'He directed a scary movie!'
            },
            genre: {
                name: 'Horror',
                description: 'Good luck keeping your eyes open.'
            },
            img: ''
        },
        {
            title: 'Aliens',
            description: 'Lets light the fires and kick the tires! Here comes Ripley again, to show who is the boss!',
            director: {
                name: 'James Cameron',
                bio: 'He directed an all time classic!'
            },
            genre: {
                name: 'Horror',
                description: 'Good luck keeping your eyes open.'
            },
            img: ''
        },
        {
            title: 'The Abyss',
            description: "I don't know about going that deep in the water! Something just might find you.",
            director: {
                name: 'James Cameron',
                bio: 'He directed some good movies.'
            },
            genre: {
                name: 'Suspense',
                description: 'You are afraid to look away!'
            },
            img: ''
        },
];

    // READ 
app.get('/', (req, res) => {
    res.send('Swagflix coming soon!');
});
    // READ send to doc file in public folder
app.get('/documenatation.html', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

    // READ list of movies
 app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

    // READ movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

    // READ movie by name of genre 
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
});

    // READ directors name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
});

 
    // Create user and id
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('user need names')
    }
});

   // UPDATE user id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user');
    }
});


    // CREATE add movie to fav
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites`);
    } else {
        res.status(400).send('did not add to favorites');
    }
});

    // DELETE movie from fav
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

        // Checks to make sure user exists
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from users ${id}'s favorites`);
    } else {
        res.status(400).send('did not remove');
    }
});

    // DELETE user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('user has not been deleted');
    }
});

    // Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
    
    // Listen for requests
app.listen(8080, () => {
    console.log("I'm running!");
});