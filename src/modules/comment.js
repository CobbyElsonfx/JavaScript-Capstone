// This module handles form submission and refreshing the page
import add from './naming.js';

const theForm = () => {
  const form = document.querySelectorAll('.commentForm');
  const theName = document.getElementById('name');
  const theComment = document.getElementById('comment');
  // Handle form submission
  form.forEach((form1) => {
    form1.addEventListener('submit', async (e) => {
      e.preventDefault();
      await add(theName.value, theComment.value);
      theName.value = '';
      theComment.value = '';
    });
  });
};

export default theForm;
