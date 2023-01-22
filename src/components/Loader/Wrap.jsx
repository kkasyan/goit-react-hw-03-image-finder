import css from './wrap.module.css';
import { Loader } from './Loader';

export const Wrap = () => {
  return (
    <div className={css.loaderWrap}>
      <Loader />
    </div>
  );
};
