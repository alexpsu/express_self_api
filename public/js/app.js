console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#movies-template').html();

  var template = Handlebars.compile(source);

  var baseUrl = '/api/movies';

  var allMovies = [];

  var $moviesList = $('#movies-list');

  var $createMovie = $('#create-movie');

  var newTitle;
  var newDirector;
  var newId;


  var moviesHtml;

  $.ajax({
    method: 'GET',
    url: baseUrl,
    success: function(taco) {
      allMovies = taco.movies;
      console.log(allMovies);
      moviesHtml = template({movies: allMovies});
      $('#movies-list').append(moviesHtml);
    }
  });

  $createMovie.on('submit', function (event) {
    event.preventDefault();
    var newMovie = $('#create-movie').serialize();
    newMovie._id = (allMovies.length + 1);
    console.log(newMovie);
    $.ajax({
      method: 'POST',
      url: baseUrl,
      data: newMovie,
      success: function(data) {
        $('#movies-list').append("<p>" + data.title + " by " + data.director + "</p>");
      }
    })
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
            allMovies.splice(allMovies.indexOf(movieToUpdate), 1, data);
            $moviesList.empty();
            moviesHtml = template({movies: allMovies});
            $('#movies-list').append(moviesHtml);
          }
      });
    })

    .on('click', '.delete-movie', function (event) {
      event.preventDefault();

      // find the todo's id (stored in HTML as `data-id`)
      var movieId = $(this).closest('.movie').attr('data-id');

      // find the todo to delete by its id
      var movieToDelete = allMovies.filter(function (movie) {
        return movie._id == movieId;
      })[0];

      // DELETE request to delete todo
      $.ajax({
        type: 'DELETE',
        url: baseUrl + '/' + movieId,
        success: function(data) {
          // remove deleted todo from all todos
          allMovies.splice(allMovies.indexOf(movieToDelete), 1);

          // render all todos to view
          $moviesList.empty();
          moviesHtml = template({movies: allMovies});
          $('#movies-list').append(moviesHtml);
        }
      });
    });

});
