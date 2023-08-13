import { createReservation } from './functionalities.js';

const modalContent = (data) => {
  let modalTemplate = '';
  data.forEach((movie) => {
    modalTemplate += `
        <div class="modal fade" id="exampleModal-${movie.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center p-3 mb-2 w text-dark" id="exampleModalLabel">${movie.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- Your modal content here -->
                <div class="card" style="width: auto;">
                <img class="card-img-top text-dark" style="height: 23rem;" src="${movie.image.medium}" alt="Card image cap">
                <div class="card-body text-dark">
                   <p class="card-text text-dark">${movie.summary}</p>
                 <div class="row">
                    <div class="col text-dark">
                    Type : ${movie.type}
                    </div>
                    <div class="col text-dark">
                    Language : ${movie.language}
                    </div>
                 </div>
                 <div class="row">
                    <div class="col text-dark">
                    Status : ${movie.status}
                    </div>
                    <div class="col text-dark">
                    Premiered : ${movie.premiered}
                    </div>
                </div>
                <br>
                <hr>
                <h4> Reservations ${2} </h4> 
                <form class="reservation-form">
                <label for="movieName">Series Name:</label>
                <input id="item-name" name="movieName" class="form-control" type="text" value="${movie.name}" aria-label="Disabled input example" disabled readonly>

                <div class="form-group ">
                <br>
                  <label for="username">Your Name:</label>
                        <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name" name = "username">
                    </div>
                    <div class="form-group">
                      <label for="startDate">Start Date</label>
                      <input type="text" class="form-control datepicker" id="startDate" placeholder="Select start date" name="date_start">
                      <small id="emailHelp" class="form-text text-muted">Note : The format should be like this only "YEAR-MONTH-DAY" </small>
                    </div>
                    <div class="form-group">
                      <label for="endDate">End Date</label>
                      <input type="text" class="form-control datepicker" id="endDate" placeholder="Select end date" name="date_end">
                      <small id="emailHelp" class="form-text text-muted">Note : The format should be like this only "YEAR-MONTH-DAY" </small>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      `;
  });
  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const modal = event.target.closest('.modal');
    const username = event.target.querySelector('input[name="username"]').value;
    const dateStart = event.target.querySelector('input[name="date_start"]').value;
    const dateEnd = event.target.querySelector('input[name="date_end"]').value;
    const movieName = modal.querySelector('.modal-title').textContent;

    // Call the createReservation function
    await createReservation(movieName, username, dateStart, dateEnd);
    username.value = '';
    dateStart.value = '';
    dateEnd.value = '';
    movieName.value = '';
  };

  // Attach form submission handler to the form element
  document.addEventListener('submit', (event) => {
    if (event.target && event.target.classList.contains('reservation-form')) {
      handleFormSubmit(event);
    }
  });

  return modalTemplate;
};

export default modalContent;
