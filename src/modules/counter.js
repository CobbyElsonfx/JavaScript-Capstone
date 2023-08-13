// commentCounter.js
const countComments = (movieId, comments) => comments.length;

const likesCount = (likes) => {
  const likesSymbol = document.querySelector('.likeBtn');
  likesSymbol.addEventListener('click', () => {
    likes += 1;
  });
  likesSymbol.click();
  return likes;
};
const moviesCount = (shows) => shows.length;

export { countComments, likesCount, moviesCount };
