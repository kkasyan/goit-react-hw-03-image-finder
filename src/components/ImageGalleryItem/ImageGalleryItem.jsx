import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  toggleModal,
  getPhotos,
  largeImageURL,
  getImage,
}) => {
  return (
    <li className={css.galleryItem} onClick={() => getImage(largeImageURL)}>
      <img className={css.galImg} src={webformatURL} alt="ALT" />
    </li>
  );
};
