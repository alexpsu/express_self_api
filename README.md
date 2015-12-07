URL(Nothing shows up. Stuff works with API endpoints though.):
	https://hidden-reaches-6287.herokuapp.com/

Endpoints avaiable on my API:

Endpoint: '/api/profile'
        Use's 'GET' method and the server responds with a json object that contains info about me.

Endpoint: '/api/movies'
        Use's 'GET' method and the server responds with a object containing an array of my favorite movies.

Endpoint: '/api/movies/:id'
        'GET' method to have the server respond with 1 movie specified by id.

Enpoint: '/api/movies/search'
        'GET' method to search the database for a specific movie by title that the server responds with.

Endpoint: '/api/movies'
        'POST' method to add a new movie to the database. Server responds with an updated list of movies.

Endpoint: '/api/movies/:id'
        'PUT' method to update a current movie on the list.

Endpoint: '/api/movies/:id'
        'DESTROY' method to break out the star destroyer and go to town on a specific movie on the server. Movie is chosen by id.

Homepage info:
    There is a form on the homepage to add a movie, and there a is a list of the current movies on the server that can be updated with the methods listed above.