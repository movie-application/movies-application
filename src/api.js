module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },
    addMovies: (newMovie) => {
        console.log(newMovie);
        return fetch('/api/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newMovie)
        })
    },

    getMovie: (id) => {
        console.log(id);
        return fetch(`/api/movies/${id}`, {
            method: 'GET'
        })
            .then(data => data.json())
    },

    editMovie: (id, movie) => {
        console.log(movie.id);
        return fetch(`/api/movies/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
    },
    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        })
    }

};



