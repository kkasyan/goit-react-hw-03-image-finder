import css from './imageGallery.module.css';
import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { SearchLoad } from './SearchLoad/SearchLoad';
import { Wrap } from 'components/Loader/Wrap';

import { getPhotos } from 'api/api';
// import { smoothScroll } from 'helpers/smoothScroll';

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalHits: null,
    photos: [],
    // image: null,
    // loading: false,
    error: null,
    status: 'idle',
    modalOpen: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const newName = this.props.imageName;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevName !== newName) {
      this.reset();
      this.setState({
        // loading: true,
        // page: 1,
        // totalHits: null,
        // photos: [],
        status: 'pending',
        // image: null,
      });

      if (prevName !== newName || (prevPage !== newPage && newPage !== 1)) {
        try {
          const pphotos = await getPhotos(newName, newPage);

          if (pphotos.totalHits === 0) {
            return this.setState({ status: 'error' });
          }
          console.log('resolved');
          this.setState(prevState => ({
            status: 'resolved',
            totalHits: pphotos.totalHits,
            photos: [...prevState.photos, ...pphotos.hits],
          }));

          // if (newPage !== 1) {
          //   smoothScroll();
          // }
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
    console.log('click');
  };

  closeModal = () => {
    this.setState({ modalOpen: null });
  };

  reset = () => {
    this.setState({
      page: 1,
      totalHits: null,
      photos: [],
    });
  };

  render() {
    const { error, status, photos, totalHits } = this.state;
    const { getPhotos, loadMore, newPage, prevPage } = this;

    if (status === 'idle') {
      return (
        <p className={css.idleText}>
          Please enter what would you like to see! 🌞
        </p>
      );
    }

    if (status === 'pending' || newPage !== prevPage) {
      return <Wrap />;
    }

    if (status === 'resolved') {
      return (
        <>
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
          {totalHits > 12 && (
            <SearchLoad loadMore={loadMore} text="Load more" />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          Sorry, there is something wrong here... Please try again! {error}
        </div>
      );
    }
  }
}
