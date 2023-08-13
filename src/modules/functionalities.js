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

  const requestBody = {
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
    return response.status;
  } catch (error) {
    return 0;
  }
};

// Function to fetch reservations
const getReservations = async (itemId) => {
  const appId = 'XySHXEsIGGBSA40iaBEF'; // Replace with the actual app ID
  const getUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/reservations?item_id=${itemId}`;

  try {
    const response = await fetch(getUrl);
    if (response.ok) {
      const reservations = await response.json();
      // Process and display reservations as needed
      return Array.from(reservations);
    }
    return response.status;
  } catch (error) {
    return 0;
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

const getLikes = async (movieId) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1lQTFOEu5O5KmM8n2meG/likes');
  if (!response) {
    throw new Error('Failed to fetched');
  }
  const data = await response.json();
  const foundMovie = data.filter((movie) => movie.item_id === movieId);
  foundMovie.forEach((item) => {
    const likesCountContainer = document.querySelector(`.likesCount${movieId}`);
    const countNum = item ? item.likes : 0;
    likesCountContainer.textContent = countNum;
  });
};

// unlike
const getLikesForUnclick = async (movieId) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1lQTFOEu5O5KmM8n2meG/likes');
  if (!response) {
    throw new Error('Failed to fetched');
  }
  const data = await response.json();
  const foundMovie = data.filter((movie) => movie.item_id === movieId);
  foundMovie.forEach((item) => {
    const likesCountContainer = document.querySelector(`.likesCount${movieId}`);
    const countNum = item ? item.likes : 0;
    likesCountContainer.textContent = countNum - 1;
  });
};

// comments
const postComment = async (api, movieId, username, comment) => {
  try {
    const data = {
      item_id: movieId,
      username,
      comment,
    };

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to post comments');
    }
  } catch (error) {
    throw new Error(error);
  }
};

const fetchCommentsFromApi = async (movieId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/1lQTFOEu5O5KmM8n2meG/comments?item_id=${movieId}`);
    const comments = await response.json();
    return comments;
  } catch (error) {
    return 0;
  }
};

const renderComments = (modal, comments) => {
  const commentArea = modal.querySelector('.commentArea');
  commentArea.innerHTML = '';

  // Render the comments in the modal
  comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.textContent = `${comment.creation_date}:${comment.username}: ${comment.comment}`;
    commentArea.appendChild(commentDiv);
  });
};

export {
  getMoviesData,
  postLikes,
  getLikes,
  createReservation,
  getReservations,
  postComment,
  fetchCommentsFromApi,
  renderComments,
  getLikesForUnclick,
};