import sayHello from './hello';


sayHello('World');


const {

    getMovies,
    getMovie,
    deleteMovie,
    getPosters,
    editMovie,
    addMovies

} = require('./api.js');

const $ = require('jquery');

// Global Variables

let mArray = [];
let renderText = '';
let id = 0


// Gets Movies and Removes DOM Elements
getMovies().then((movies) => {
    movies.forEach(({title, rating, id, genre}) => {
        $('#movie_card').append
        (`<div class="card animated fadeIn">
            <ul class="list-group list-group-flush movie_card">
                <li>ID: ${id}</li>
                <li><h5>${title}</h5></li>
                <li><img src="http://placeholder.pics/svg/200x150" alt="placeholder image"></li>
                <li>Rating: ${rating}</li>
                <li>Genre: ${genre}</li>
                <li><button type="button" class="delete btn btn-warning" value="${id}">DELETE</button></li>
            </ul>
        </div>`)
    });

    $('#add-movie').removeClass('hidden_class');
    $('#movieEdit').removeClass('hidden_class');
    $('#loader_wrapper').addClass('hidden_loader');

    makeArrayOfMovies();

}).catch((error) => {
    alert('Error')
    console.log(error);
});

function makeArrayOfMovies() {
    mArray = [];
    getMovies().then((movies) => {
        movies.forEach(function (movie) {
            mArray.push(movie)
        });
    });
}

// CRUD OPERATION

// Add Movie
$('#add').on('click', function (e) {
    e.preventDefault();
    let movieName = $('#movie-name').val();
    let rating = $('#rating').val();
    let genre = $('#genre').val();
    let newMovie = {
        title: movieName,
        rating: rating,
        genre: genre};
    console.log(newMovie);
    addMovies(newMovie).then(function () {
    }).catch(function () {
    });
    renderMovies();
    makeArrayOfMovies()
});

// Render Movie from the Array
function renderMovies() {
    $('#movie_card').html('');
    getMovies().then((movies) => {
        $('#movie_card').html('');
        movies.forEach(({title, rating, id, genre}) => {
            $('#movie_card').append
            (`<div class="card animated fadeIn">
            <ul class="list-group list-group-flush movie_card">
                <li>ID: ${id}</li>
                <li><h5>${title}</h5></li>
                <li><img src="http://placeholder.pics/svg/200x150" alt="placeholder image"></li>
                <li>Rating: ${rating}</li>
                <li>Genre: ${genre}</li>
                <li><button type="button" class="delete btn btn-warning" value="${id}">DELETE</button></li>
            </ul>
        </div>`)
        });
    })
}

// Edit Movie and Update Array Information
$('#submit-movie-edits').on('click', function (e) {
    e.preventDefault();
    let movieName = $('#editTitle').val();
    let rating = $('#editRating').val();
    let newGenre = $('#editGenre').val();
    let movieData = {
        title: movieName,
        rating: rating,
        genre: newGenre};
    let editId = id;
    console.log(movieData);
    editMovie(editId, movieData)
        .then(console.log('Success'))
        .catch(console.log('Error'));
    renderMovies();
    makeArrayOfMovies()
});

// Search Movie Array
function searchMovies(e) {
    renderText += e.key.toLowerCase();
    let searchArray = [];
    mArray.forEach(function (movie) {
        if (movie.title.toLowerCase().startsWith(renderText)) {
            searchArray.push(movie)
        } else if (movie.genre.toLocaleLowerCase().startsWith(renderText)) {
            searchArray.push(movie);
        } else if (movie.rating === renderText) {
            searchArray.push(movie)
        }
    });

    $('#movie_card').html('');

    searchArray.forEach(({title, rating, id, genre}) => {
        $('#movie_card').append
        (`<div class="card animated fadeIn">
            <ul class="list-group list-group-flush movie_card">
                <li>ID: ${id}</li>
                <li><h5>${title}</h5></li>
                <li><img src="http://placeholder.pics/svg/200x150" alt="placeholder image"></li>
                <li>Rating: ${rating}</li>
                <li>Genre: ${genre}</li>
                <li><button type="button" class="delete btn btn-warning" value="${id}">DELETE</button></li>
            </ul>
        </div>`)
    })
}

$('#search').on('keypress', searchMovies);
$('#search').on('keyup', function (e) {
    if (e.key === 'Backspace') {
        renderText = renderText.split('');
        renderText.pop();
        renderText = renderText.join('');
        if (renderText === '') {
            renderMovies()
        }
    }
});

// Get Movie Information from DB after ID is entered
$('#submitId').on('click', function (e) {
    e.preventDefault();
    id = $('#editId').val();
    getMovie(id).then((movie) => {
        console.log(movie);
        $('#searchResult').html
        (`<h5 class="animated bounceIn" >Title: ${movie.title}</h5>
          <h5 class="animated bounceIn" >Rating: ${movie.rating}</h5>
          <h5 class="animated bounceIn" >Genre: ${movie.genre}</h5>`)
    });
});

// Delete Movie From db
$('#movie_card').on('click', '.delete', function (e) {
    e.preventDefault();
    let deleteID = $(e.target).val();
    deleteMovie(deleteID).then(function () {
        renderMovies();
        makeArrayOfMovies()
    });
});
