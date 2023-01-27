import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const KEY = '30555185-2572b857d9a371e437f5a3fd3';

axios.defaults.params = {
  key: KEY,
  orientation: 'horizontal',
  image_type: 'photo',
  safesearch: 'true',
  per_page: 12,
};

export const getPhotos = async (query, page) => {
  // const config = {
  //   params: {
  //     q: query,
  //     page: page,
  //   },
  // };
  const response = await axios.get(
    `${baseURL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  console.log(response.data);
  return response.data;
};
