// commentCounter.test.js
import { countComments, moviesCount } from '../modules/counter.js';

// Example test cases
test('countComments should count comments correctly', () => {
  const comments = [
    { item_id: 1, text: 'Comment 1' },
    { item_id: 2, text: 'Comment 2' },
    { item_id: 1, text: 'Comment 3' },
  ];

  expect(countComments(1, comments)).toBe(3);
});

test('moviesCount should count movies correctly', () => {
  const movies = [
    {
      id: 97,
      name: 'The Biggest Loser',
      url: 'https://www.tvmaze.com/shows/97/the-biggest-loser',
      type: 'Reality',
    },
    {
      id: 98,
      name: 'Another Show',
      url: 'https://www.tvmaze.com/shows/98/another-show',
      type: 'Comedy',
    },
    {
      id: 99,
      name: 'Drama Series',
      url: 'https://www.tvmaze.com/shows/99/drama-series',
      type: 'Drama',
    },
    {
      id: 100,
      name: 'Adventure Time',
      url: 'https://www.tvmaze.com/shows/100/adventure-time',
      type: 'Animation',
    },
    {
      id: 101,
      name: 'Mystery Quest',
      url: 'https://www.tvmaze.com/shows/101/mystery-quest',
      type: 'Mystery',
    },
  ];

  expect(moviesCount(1, movies)).toBe(5);
});
