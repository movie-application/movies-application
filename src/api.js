module.exports = {

    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },

    getMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'GET'
        })
            .then(data => data.json())
    },

    addMovies: (newMovie) => {
        return fetch('/api/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMovie)
        })
    },

    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        })
    },

    getPosters: (movies) => {
        let posterURL = 'http://www.omdbapi.com/?apikey=7a6b2b5d&t=';
        let titleSearch = movies.title;
        console.log(titleSearch);
        return fetch(posterURL + titleSearch)
    },

    editMovie: (id, movie) => {
        return fetch(`/api/movies/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
    },
};



