/* eslint-disable max-len */
import './style.css';
import { getMoviesData, postLikes } from './modules/functionalities.js';
import { showApiUrl } from './modules/showsAPI.js';

// modal import
import modalContent from './modules/reservation.js';

// api imports
import { likeApi } from './modules/involvementAPI.js';
import 'bootstrap';

import './assets/bg-for-page.jpg';
import theForm from './modules/comment.js';
import print from './modules/print.js';


// Function to send a POST request to store a comment
async function postCommentToAPI(movieId, name, comment) {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      movieId,
      name,
      comment,
    }),
  });

  // Handle the response status and errors if needed
  if (!response.ok) {
    // console.error('Failed to post comment:', response.status);
  }
}

// Function to fetch comments from the API
async function fetchCommentsFromAPI(movieId) {
  const response = await fetch(`/api/comments/${movieId}`);
  const comments = await response.json();
  return comments;
}

// Function to fetch and display comments
async function fetchAndDisplayComments(movieId) {
  const comments = await fetchCommentsFromAPI(movieId);
  const commentsSection = document.querySelector(`#commentModal-${movieId} .comments-section`);
  commentsSection.innerHTML = ''; // Clear previous comments
  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.textContent = `${comment.name}: ${comment.comment}`;
    commentsSection.appendChild(commentElement);
  });
}

const renderMovies = async () => {
  const data = await getMoviesData(showApiUrl);
  data.sort(() => 0.5 - Math.random());
  data.length = 20;
  const movieContainer = document.getElementById('movieContainer');

  data.forEach(async (movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-3', 'col-sm-6', 'mb-4');
    movieCard.innerHTML = `
      <div class="card custom-card">
        <img src=${movie.image.medium} class="card-img-top" alt="images">
        <div class="card-body">
          <div>
            <span class="card-title">${movie.name}</span>
            <div>
            <span class="likeBtn" data-movie-id="${movie.id}">&#9825</span>
            <span class="likesCount${movie.id}">0</span>
            </div>
          </div>
          <div class="card-text">
            <button type="button" 
                    class="btn btn-primary comment-button " 
                    data-bs-toggle="modal" 
                    data-bs-target="#commentModal-${movie.id}">
              Comment
            </button>
            <br>
            <a type="button"  class="btn btn-primary reservationBtn"  id="${movie.id}" data-toggle="modal" data-target="#exampleModal-${movie.id}" >Reservations</a>
          </div>
        </div>
      </div>
    `;

    movieContainer.appendChild(movieCard);

    //  likes functionality
    const likeBtn = movieCard.querySelector('.likeBtn'); // Select the like button within the movie card
    const likesCountContainer = movieCard.querySelector(`.likesCount${movie.id}`);

    let isLiked = false;
    let likesCount = parseInt(likesCountContainer.textContent);

    likeBtn.addEventListener('click', async () => {
      if (isLiked) {
        // If already liked, subtract the like and change the symbol back
        likesCount -= 1;
        likeBtn.innerHTML = '&#9825';
        isLiked = false;
      } else {
        // If not liked, add the like and change the symbol to ❤
        likesCount += 1;
        likeBtn.innerHTML = '❤️';
        isLiked = true;
      }

      likesCountContainer.textContent = likesCount;
      // Call postLikes to record likes to the API
      await postLikes(movie.id, likeApi);
      console.log(`Likes recorded for movie with id ${movie.id}: ${likesCount}`);
    });

    // modal functionality
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = `commentModal-${movie.id}`;
    modal.setAttribute('aria-labelledby', `exampleModalCenterTitle-${movie.id}`);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img src=${movie.image.medium} class="" alt="modal images">
        </div>
        <div>${movie.summary}</div>
        <div class="comments-section"> <!-- Placeholder for comments -->
          <!-- Comments fetched from API will be added here -->
        </div>
        <div>
          <form id="commentForm-${movie.id}">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
              <label for="comment">Comment</label>
              <textarea class="form-control" id="comment" rows="3" placeholder="Enter your comment"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    // Find the comment form and button in the modal
    const commentForm = modal.querySelector(`#commentForm-${movie.id}`);

    // Add event listener for comment form submission
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = commentForm.querySelector('#name');
      const commentInput = commentForm.querySelector('#comment');
      const name = nameInput.value;
      const comment = commentInput.value;

      // Send comment to API
      await postCommentToAPI(movie.id, name, comment);

      // Clear input fields
      nameInput.value = '';
      commentInput.value = '';

      // Fetch and display comments
      await fetchAndDisplayComments(movie.id);
    });

    // Add event listener for modal opening (to fetch and display comments)
    modal.addEventListener('shown.bs.modal', async () => {
      await fetchAndDisplayComments(movie.id);
    });
  });

  // reservation popup code
  // const reservationPopUp = document.querySelector('#overlayForBody');
  console.log(movieContainer);
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = await modalContent(data);
  // console.log(modalContainer);
  movieContainer.appendChild(modalContainer);
};

renderMovies().then(() => {
  console.log('Movies rendered');
  theForm();
  print();
});
