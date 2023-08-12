import latestMovies from './latestMovies.js'; // Replace with the correct path

const movieContainer = document.getElementById('movieContainer');

latestMovies.forEach(() => {
  // Create movie card element using movie data
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  // Set the content of the movie card based on the movie data
  // You can customize this based on your HTML structure and data

  // Append the movie card to the movieContainer
  movieContainer.appendChild(movieCard);
});
