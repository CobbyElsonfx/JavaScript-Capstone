// commentCounter.test.js
import { countComments ,moviesCount} from '../modules/counter';

// Example test cases
test('countComments should count comments correctly', () => {
  const comments = [
    { item_id: 1, text: 'Comment 1' },
    { item_id: 2, text: 'Comment 2' },
    { item_id: 1, text: 'Comment 3' }
  ];

  expect(countComments(1, comments)).toBe(3);
});
