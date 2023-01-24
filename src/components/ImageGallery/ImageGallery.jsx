import css from './imageGallery.module.css';
import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { SearchLoad } from './SearchLoad/SearchLoad';
import { Wrap } from 'components/Loader/Wrap';
import { Modal } from 'components/Modal/Modal';

import { getPhotos } from 'api/api';

// import { smoothScroll } from 'helpers/smoothScroll';

export class ImageGallery extends Component {
  state = {
    page: 1,
    totalHits: null,
    photos: [],
    error: null,
    status: 'idle',
    modalOpen: false,
    modalImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const newName = this.props.imageName;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevName !== newName) {
      this.reset();
      this.setState({
        status: 'pending',
      });

      if (prevName !== newName || (prevPage !== newPage && newPage !== 1)) {
        try {
          const pphotos = await getPhotos(newName, newPage);

          if (pphotos.totalHits === 0) {
            return this.setState({ status: 'error' });
          }
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

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  closeModal = () => {
    this.setState({ modalOpen: false, modalImage: null });
  };

  reset = () => {
    this.setState({
      page: 1,
      totalHits: null,
      photos: [],
      modalOpen: false,
    });
  };

  getImage = imageURL => {
    this.setState({
      modalImage: imageURL,
    });
    this.toggleModal();
  };

  render() {
    const { error, status, photos, totalHits, modalImage } = this.state;
    const { loadMore, newPage, prevPage, toggleModal, getImage } = this;

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
            {photos.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  largeImageURL={largeImageURL}
                  webformatURL={webformatURL}
                  getImage={getImage}
                />
              );
            })}
          </ul>
          {totalHits > 12 && (
            <SearchLoad loadMore={loadMore} text="Load more" />
          )}
          {modalImage !== null && (
            <Modal
              image={modalImage}
              toggleModal={toggleModal}
              closeModal={this.closeModal}
            />
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
