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
const createReservation = async (urls = 'ttps://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dicTRY4wTa5zQfvBUtC7/reservations', username1, dateStart, dateEnd) => {
  console.log(urls);
  try {
    const response = await fetch(urls, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json charset=utf-8',
      },
      body: JSON.stringify({
        item_id: 'item1',
        username: username1,
        date_start: dateStart,
        date_end: dateEnd,
      }), // Convert reservationData to JSON
    });

    if (response.status === 201) {
      console.log('Reservation created successfully');
    } else {
      console.error('Failed to create reservation');
    }
  } catch (error) {
    console.error('Error creating reservation:', error);
  }
};

// Function to fetch reservations
const getReservations = async (url1, item_id) => {
  const url = `${url1}?item_id=${item_id}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const reservations = await response.json();
      console.log('Reservations:', reservations);
      return reservations;
    }
    console.error('Failed to fetch reservations');
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
};

// Example reservation data
const reservationData = {
  item_id: 'item1',
  username: 'Jane',
  date_start: '2020-10-15',
  date_end: '2020-10-16',
};

// Call the functions with the appropriate app_id and item_id
const app_id = 'abc234';
createReservation(app_id, reservationData);

const item_id = 'item1';
getReservations(app_id, item_id);

export {
  getMoviesData,
  createReservation,
  getReservations,
};