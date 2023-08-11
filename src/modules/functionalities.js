const getMoviesData = async (url) => {
  try {
    const fetchedData = await fetch(url);
    const data = await fetchedData.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const postLikes = async (movieId, api) => {
  try {
    const data = {
      item_id: movieId,
    };

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to post likes');
    }

    // console.log(`Likes recorded for movie with id ${movieId}`);
  } catch (error) {
    throw new Error(error);
  }
};

const getLikes = async (api, movieId) => {
  const response = await fetch(api);
  if (!response) {
    throw new Error('Failed to fetched');
  }
  const data = await response.json();
  const foundMovie = data.filter((movie) => movie.item_id === movieId);

  const countNum = foundMovie ? foundMovie.likes : 0;
  return countNum;
};

export {
  getMoviesData,
  postLikes,
  getLikes,
};