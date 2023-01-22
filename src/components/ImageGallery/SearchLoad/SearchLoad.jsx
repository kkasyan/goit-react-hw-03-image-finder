import css from './searchLoad.module.css';
import PropTypes from 'prop-types';

export const SearchLoad = ({ type, text, loadMore }) => {
  return (
    <button onClick={loadMore} className={css.loader} type={type}>
      {text}
    </button>
  );
};

SearchLoad.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};
