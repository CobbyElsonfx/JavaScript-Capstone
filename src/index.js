/* eslint-disable max-len */
import './style.css';
// javascript files imports
import { getMoviesData } from './modules/functionalities.js';
import { showApiUrl } from './modules/showsAPI.js';
// modal import
import modalContent from './modules/reservation.js';

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
                <a type="button"  class="btn btn-primary reservationBtn"  id="${movie.id}" data-toggle="modal" data-target="#exampleModal-${movie.id}" >Reservations</a>
              </div>
            </div>
          </div>
        `;
    movieContainer.appendChild(movieCard);
  });

  // reservation popup code
  const reservationPopUp = document.querySelector('.overlayForBody');
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalContent(data);
  reservationPopUp.appendChild(modalContainer);
};

renderMovies();
