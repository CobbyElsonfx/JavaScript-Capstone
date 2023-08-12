const getMoviesData = async (url) => {
  try {
    const fetchedData = await fetch(url);
    const data = await fetchedData.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Function to create a reservation
const createReservation = async (title, username1, dateStart, dateEnd) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XySHXEsIGGBSA40iaBEF/reservations/';
  console.log(title);
  console.log(username1, dateStart, dateEnd);

  const requestBody = {
    // eslint-disable-next-line quotes
    item_id: title, // Replace with the actual item ID
    username: username1,
    date_start: dateStart,
    date_end: dateEnd,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      // Successful reservation
      console.log('Reservation successful!');
    } else {
      console.error('Reservation failed:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to fetch reservations
const getReservations = async (itemId) => {
  const item_id = itemId; // Replace with the actual item ID
  const app_id = 'XySHXEsIGGBSA40iaBEF'; // Replace with the actual app ID
  const getUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${app_id}/reservations?item_id=${item_id}`;

  try {
    const response = await fetch(getUrl);
    if (response.ok) {
      const reservations = await response.json();
      console.log('Reservations:', reservations);
      console.log('Reservations:', reservations.length);
      // Process and display reservations as needed
      return Array.from(reservations);
    // eslint-disable-next-line no-else-return
    } else {
      return console.error('NO Reservations', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
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
  createReservation,
  getReservations,
};