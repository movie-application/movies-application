/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js')

//

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

// ADD Movies

const addMovie = () => {
  const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'}; // Value from HTML
  const url = '/posts';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
  };
  fetch(url, options)
      .then(/* post was created successfully */)
      .catch(/* handle errors */);
}





// Create a form for adding a new movie that has fields for the movie's title and rating
// When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /api/movies with the information the user put into the form

// DELETE Movies

// UPDATE Movies

// RENDER Movies






