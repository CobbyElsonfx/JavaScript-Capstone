import './style.css';
// javascript files imports
import { getMoviesData } from './modules/functionalities.js';
import { showApiUrl } from './modules/showsAPI.js';

// image files imports
import './assets/bg-for-page.jpg';

// imports bootsrap
import 'bootstrap';

const renderMovies = async () => {
  const data = await getMoviesData(showApiUrl);

  data.sort(() => 0.5 - Math.random());
  data.length = 20;
  const movieContainer = document.getElementById('movieContainer');

  // Loop through fetched data and created movie cards
  data.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-3', 'col-sm-6', 'mb-4'); // Bootstrap classes

    movieCard.innerHTML = `
          <div class="card custom-card ">
            <img src=${movie.image.medium} class="card-img-top" alt="images">
            <div class="card-body">
              <div>
              <span class="card-title">${movie.name}</span>
              <span  class="likes"> Likes</span>
              </div>
              
              <div class="card-text">
                <p class="comments"> Comments</p> 
              </div>
            </div>
          </div>
        `;

    movieContainer.appendChild(movieCard);
  });
};

renderMovies();
