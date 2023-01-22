import css from './button.module.css';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export const Button = ({ type, text, ...allyProps }) => {
  return (
    <button type={type} className={css.searchFormButton} {...allyProps}>
      {/* <span className={css.searchFormButton_label}></span> */}
      <FcSearch className={css.searchFormButton_label}>{text}</FcSearch>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  'aria-label': PropTypes.string.isRequired,
};
