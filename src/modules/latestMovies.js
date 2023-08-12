async function fetchMovieData(movieId) {
  const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
  const data = await response.json();
  return data;
}

const movieIds = [28276, 43, 41007, 15299, 7480, 52343];

async function fetchAllMovieData() {
  const fetchPromises = movieIds.map(async (movieId) => {
    const movieData = await fetchMovieData(movieId);
    return movieData;
  });

  await Promise.all(fetchPromises);
}

fetchAllMovieData().then(() => {
  // console.log('All movie data fetched:', movieDataArray);
  // Generate the content for latest.js here using fetched data
});

const latestMovies = [
  // Use fetched data to populate the latestMovies array
  // Each item should be an object with the required movie data
];

export default latestMovies;
