import css from './searchForm.module.css';
import { Component } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';

export class SearchForm extends Component {
  state = { imageName: '' };

  static propTypes = {
    handleNameChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    imageName: PropTypes.string,
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Please insert what you are looking for!');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({
      imageName: '',
    });
  };

  render() {
    const { imageName } = this.state;
    const { handleSubmit, handleNameChange } = this;

    return (
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <Button type="submit" text="Search" aria-label="Search" />
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    );
  }
}
