import { Component } from 'react';

import css from './modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    console.log('comp did mount');
  }
  componentWillUnmount() {
    console.log('unmount');
  }
  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
