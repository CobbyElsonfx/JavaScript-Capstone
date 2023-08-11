// This module handles form submission and refreshing the page
import add from './naming.js';

const theForm = () => {
  const form = document.getElementById('formdetails');
  const theName = document.getElementById('name');
  const theComment = document.getElementById('comment');

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await add(theName.value, theComment.value);
    theName.value = '';
    theComment.value = '';
  });

  // Handle refresh button click
  const refresh = document.querySelector('.refreshBtn');
  refresh.addEventListener('click', () => {
    window.location.reload();
  });
};

export default theForm;
