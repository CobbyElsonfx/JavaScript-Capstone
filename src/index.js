import './style.css';
import { getMoviesData } from './modules/functionalities.js';
import { showApiUrl } from './modules/showsAPI.js';
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
            <span class="likes"> Likes</span>
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
