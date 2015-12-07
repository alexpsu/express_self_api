console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	var baseUrl = '/api/movies';

	var allMovies = [];

	var $moviesList = $('#movies-list');

	var $createMovie = $('#create-movie');

	var source = $('#movies-template').html();
	var template = Handlebars.compile(source);

	var render = function() {
		$moviesList.empty();
		var moviesHtml = template({ movies: allMovies });
		$moviesList.append(moviesHtml);
	};

	$.ajax({
		method: 'GET',
		url: baseUrl,
		success: function(taco) {
			allMovies = taco.movies
			render();
		}
	});

	$createMovie.on('submit', function (event) {
    	event.preventDefault();

    	var newMovie = $(this).serialize();

    	$.post(baseUrl, newMovie, function (data) {
      		console.log(data);
    		allMovies.push(data);
    		render();
    	});

    	$createMovie[0].reset();
    	$createMovie.find('input').first().focus();
	});

	$moviesList

    .on('submit', '.update-movie', function (event) {
    	event.preventDefault();
      
    	var movieId = $(this).closest('.movie').attr('data-id');

    	var movieToUpdate = allMovies.filter(function (movie) {
    	return movie._id == movieId;
    	})[0];

    	var updatedMovie = $(this).serialize();

    	$.ajax({
      		type: 'PUT',
      		url: baseUrl + '/' + movieId,
      		data: updatedMovie,
      		success: function(data) {
        		allMovies.splice(allMovies.indexOf(MovieToUpdate), 1, data);
        		render();
      	}
    	});
    });

});
