import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL }) => {
  return (
    <li className={css.galleryItem}>
      <img className={css.galImg} src={webformatURL} alt="ALT" />
    </li>
  );
};
