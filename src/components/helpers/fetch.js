const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33019590-ab19fb063f714cb66ad378ea8';

export const fetchImages = async (value, page) => {
  console.log('PAGE for value: ', value, 'is ', page);
  return await fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
