import css from './searchbar.module.css';

import { SearchForm } from 'components/SearchForm/SearchForm';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};
