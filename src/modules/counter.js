const likesCounter = (id) => {
  const likeBtn = document.querySelector(`.likeBtn${id}`);
  let likes = 0;
  likeBtn.addEventListener('click', () => {
    likes += 1;
    return likes;
  });
  return likes;
};

export default likesCounter;