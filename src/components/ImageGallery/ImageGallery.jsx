import css from './imageGallery.module.css';
import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { SearchLoad } from './SearchLoad/SearchLoad';
import { Loader } from 'components/Loader/Loader';

import { getPhotos } from 'api/api';

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalHits: null,
    photos: [],
    // image: null,
    // loading: false,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const newName = this.props.imageName;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    const { page } = this.state;

    if (prevName !== newName) {
      this.setState({
        // loading: true,
        page: 1,
        totalHits: null,
        photos: [],
        status: 'pending',
        // image: null,
      });
      if (prevName !== newName || (prevPage !== newPage && newPage !== 1)) {
        try {
          const pphotos = await getPhotos(newName, page);

          if (pphotos.totalHits === 0) {
            return this.setState({ status: 'error' });
          }
          console.log('resolved');
          this.setState(prevState => ({
            status: 'resolved',
            totalHits: pphotos.totalHits,
            photos: [...prevState.photos, ...pphotos.hits],
          }));
        } catch (error) {
          this.setState({ error, status: 'rejected' });
          console.log(error);
        }
      }
    }
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    const { image, error, status, imageName, photos, totalHits } = this.state;
    const { getPhotos, loadMore } = this;

    if (status === 'idle') {
      return <p>Please enter what would you like to see!</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.gallery}>
          {photos.map(({ id, webformatURL, largeImageURl }) => {
            return (
              <ImageGalleryItem
                key={id}
                largeImageURl={largeImageURl}
                webformatURL={webformatURL}
                getPhotos={getPhotos}
              />
            );
          })}
        </ul>
      );
    }
    if (totalHits.length > 12) {
      return <SearchLoad loadMore={loadMore} text="Load more" />;
    }
    //   {
    //     totalHits > 12 && <SearchLoad loadMore={loadMore} text="Load more" />;
    // }

    if (status === 'rejected') {
      return <div>Ошибка! {error}</div>;
    }
  }
}

//вариант с fetch
// setTimeout(() => {
//   fetch(
//     `https://pixabay.com/api/?key=30555185-2572b857d9a371e437f5a3fd3&q=${newName}&image_type=photo`
//   )
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(
//         new Error(`There is nothing to show for ${newName}!`)
//       );
//     })
//     .then(image => this.setState({ image, status: 'resolved' }))
//     .catch(error => this.setState({ error, status: 'rejected' }));
//   // .finally(() => this.setState({ loading: false }));
// }, 1000);
