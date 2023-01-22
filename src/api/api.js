import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30555185-2572b857d9a371e437f5a3fd3';

axios.defaults.params = {
  key: KEY,
  orientation: 'horizontal',
  image_type: 'photo',
  safesearch: 'true',
  per_page: 12,
};

export const getPhotos = async (query, page) => {
  const config = {
    params: {
      q: query,
      page: page,
    },
  };
  const response = await axios.get('', config);
  console.log(response.data);
  return response.data;
};

// export default class PixabayApiService {
//   constructor(params) {
//     this.searchQuery = '';
//     this.page = 1;
//     this.perPage = 12;
//   }

//   async getPhotos() {
//     try {
//       const response = await axios.get(
//         `?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=false&page=${this.page}&per_page=${this.perPage}`
//       );

//       if (response.data.hits.length === 0) {
//         onNoResults();
//         return;
//       }
//       if (response.data.hits.length !== 0) {
//         onFoundImages(response.data.totalHits);
//         makeCardTemplate(response.data.hits);
//         this.incrementPage();
//         onBtnShow();
//         simple.refresh();
//       }
//       if (response.data.hits.length < this.perPage) {
//         onSearchEnd();
//         onBtnHide();
//       }

//       if (this.page > 1) {
//         const { height: cardHeight } = document
//           .querySelector('.gallery')
//           .firstElementChild.getBoundingClientRect();

//         window.scrollBy({
//           top: cardHeight * 2,
//           behavior: 'smooth',
//         });
//       }
//     } catch (error) {
//       if (response.status === 404) {
//         throw new Error(response.status);
//       }
//       return response;
//     }
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   calculateTotalPages(total) {
//     this.totalPages = Math.ceil(total / this.perPage);
//     console.log(this.totalPages);
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   onLoadMore() {
//     pixabay.getPhotos();
//   }
// }
