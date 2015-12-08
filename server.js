// require express and other modules
var express = require('express'),
    app = express();
    bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS: we'll use this today to reduce security so we can more easily test our code in the browser.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var movies = [
  { _id: 1, title: 'Beast of No Nation', director: 'Cary Fukunaga' },
  { _id: 2, title: 'Howl\'s moving castle', director: 'Hayao Miyazaki' },
  { _id: 3, title: 'Snatch', director: 'Guy Ritchie' }
];

var profile = [
  {name: "Alex Rao", github_link: "<a href=\"https://github.com/alexpsu\">", curent_city: "Palo Alto", family_members: [
    {name: "Pradeep Rao", relationship: "father"},
    {name: "Amy Rao", relationship: "mother"},
    {name: "Ahna Rao", relationship: "sister"}
    ]
  }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to my personal api!",
    documentation_url: "https://github.com/alexpsu/express_self_api/README.md", // CHANGE THIS TO LINK TO YOUR README.md
    base_url: "http://hidden-reaches-6287.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api/profile", description: "A little about me!"},
      {method: "GET", path: "/api/movies", description: "A list of my favorite movies"},
      {method: "GET", path: "/api/movies/:id", description: "A specific movie"},
      {method: "GET", path: "/api/movies/search", description: "Search's for a specific movie"},
      {method: "POST", path: "/api/movies", description: "Post a movie"},
      {method: "PUT", path: "/api/movies/:id", description: "Edit a movie"},
      {method: "DELETE", path: "/api/movies/:id", description: "Delete a movie"}
    ]
  })
});

app.get('/api/profile', function index(req, res) {
  res.json({profile});
});

app.get('/api/movies', function index(req, res) {
  res.json({movies});
});

app.get('/api/movies/:id', function show(req, res) {
  var idReq = req.params.id;
  var found;
  movies.forEach(function(ele) {
    if(ele._id == idReq) {
      found = movies.indexOf(ele);
      console.log(found);
    } else {
      console.log("dudid")
    }
  })
  res.json(movies[found]);
});

app.get('/api/search', function search(req, res){
  var newSearch = req.query.q;
  var filterMovie = [];
  movies.forEach(function(ele, index) {
    if(ele.title == newSearch) {
      filterMovie.push(ele);
    } else {
      console.log("dudsearch");
      console.log(ele);
    }
  })
  res.json({movies: filterMovie});
});

app.post('/api/movies', function create(req, res) {
  var newMovie;
  var newid;
  if( movies.length > 0) {
    newid = movies[movies.length - 1]._id + 1
  } else {
    newid = 1;
  }
  var newTitle = req.body.title;
  var newDirector = req.body.director;
  newMovie = { _id: newid, title: newTitle, director: newDirector}
  movies.push(newMovie);
  res.json(newMovie);
});

app.put('/api/movies/:id', function update(req, res) {
  var idReq = parseInt(req.params.id);
  var newTitle = req.body.title;
  var newDirector = req.body.director;
  var updateMovie = { _id: idReq, title: newTitle, director: newDirector};
  res.json(updateMovie);
});

app.delete('/api/movies/:id', function destroy(req, res) {
  var idReq = parseInt(req.params.id);
  var found;
  movies.forEach(function(ele, index) {
    if(ele._id === idReq) {
      found = index;
    } else {
      console.log("dud");
    }
  })
  var newMovies = movies.splice(found, 1);
  res.json(newMovies);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
