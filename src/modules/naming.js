const add = async (name, comment) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/comments/VMZlv63JD79wzgO8qMla/comments/', {
      method: 'POST',
      body: JSON.stringify({ user: name, comment }),
      headers: { 'Content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Adding comment failed.');
    }
  } catch (error) {
    // console.error('Error adding your comment:', error);
  }
};

export default add;