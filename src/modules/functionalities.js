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
const getReservations = async () => {
  const item_id = 'item1'; // Replace with the actual item ID
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
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example reservation data
// const reservationData = {
//   item_id: 'item1',
//   username: 'Jane',
//   date_start: '2020-10-15',
//   date_end: '2020-10-16',
// };

export {
  getMoviesData,
  createReservation,
  getReservations,
};