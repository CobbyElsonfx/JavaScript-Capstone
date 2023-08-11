import './style.css';
import { getMoviesData, postLikes } from './modules/functionalities.js';
import { showApiUrl } from './modules/showsAPI.js';
import { likeApi } from './modules/involvementAPI.js';
import 'bootstrap';
import './assets/bg-for-page.jpg';

const renderMovies = async () => {
  const data = await getMoviesData(showApiUrl);

  data.sort(() => 0.5 - Math.random());
  data.length = 20;
  const movieContainer = document.getElementById('movieContainer');

  data.forEach((movie) => {
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
          <div>
            <form>
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
  });
};

renderMovies();
