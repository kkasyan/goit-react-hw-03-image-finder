import css from './imageGalleryItem.module.css';

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, getImage }) => {
  return (
    <li className={css.galleryItem} onClick={() => getImage(largeImageURL)}>
      <img className={css.galImg} src={webformatURL} alt="ALT" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  getImage: PropTypes.func,
};
