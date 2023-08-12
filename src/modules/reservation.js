/* eslint-disable consistent-return */
import { createReservation, getReservations } from './functionalities.js';

const modalContent = async (data) => {
  let modalTemplate = '';
  // let num = await getReservations(movie.id);
  console.log(data);
  data.forEach((movie) => {
    // console.log('num is undefined');
    modalTemplate += `
        <div class="modal fade" id="exampleModal-${movie.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center p-3 mb-2 w " id="exampleModalLabel">${movie.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">s
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
                <h4> Reservations 0 </h4> 
                <div class="row">
                 <div class="col text-dark" id = "Customer"></div>
                </div>
                <div class="row">
                 <div class="col text-dark" id = "start-date"></div>
                </div>
                <div class="row">
                 <div class="col text-dark" id = "end-date"></div>
                </div>
                <form class="reservation-form">
                <label for="movieName">Series Name:</label>
                <input id="item-name" name="movieId" class="form-control" type="text" value="${movie.id}" aria-label="Disabled input example" disabled readonly>

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


  const setReservationInfo = () => {
    const Customer2 = document.getElementById('Customer');
    const startdate2 = document.getElementById('start-date');
    const enddate2 = document.getElementById('end-date');
    console.log(Customer2);
    data.forEach(async (resFetch) => {
      const num = await getReservations(resFetch.id);
      console.log(resFetch.id);
      if (num !== undefined) {
        console.log(num);
        console.log(num[0]["date_start"]);
        console.log(num[0]["date_end"]);
        console.log(num[0]["username"]);
        Customer2.innerHTML = `Customer : ${num[0]["username"]}`;
        startdate2.innerHTML = `Start Date : ${num[0]["date_start"]}`;
        enddate2.innerHTML = `End Date : ${num[0]["date_end"]}`;
      }
    });
  };
  
  setReservationInfo();
  
  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Form submitted!'); // Log to the console to verify it's working
    console.log(event);
    const modal = event.target.closest('.modal');
    const username = event.target.querySelector('input[name="username"]').value;
    const dateStart = event.target.querySelector('input[name="date_start"]').value;
    const dateEnd = event.target.querySelector('input[name="date_end"]').value;
    const movieName = event.target.querySelector('input[name="movieId"]').value;

    console.log(movieName, username, dateStart, dateEnd);
    // Call the createReservation function
    await createReservation(movieName, username, dateStart, dateEnd);
    alert('Reservation created successfully!'); // Alert the users
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
