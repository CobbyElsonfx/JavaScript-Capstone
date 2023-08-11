// This module handles fetching and printing leaderboard scores
const print = async () => {
  const wrapper = document.querySelector('.comments-section');

  // Create a list item template
  const template = (user, comment) => {
    const list = document.createElement('form-group');
    list.innerText = `${user}: ${comment}`;
    wrapper.appendChild(list);
  };

  try {
    // Fetch comments from the API
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/comments/VMZlv63JD79wzgO8qMla/comments/');
    const data = await response.json();

    if (data.result && data.result.length > 0) {
      // Sort and display comments
      const sortedData = data.result.sort((a, b) => b.comment - a.comment);
      sortedData.forEach((entry) => {
        template(entry.user, entry.comment);
      });
    } else {
      // console.log('No comments available.');
    }
  } catch (error) {
    // console.error('Error fetching and printing comments:', error);
  }
};

export default print;
