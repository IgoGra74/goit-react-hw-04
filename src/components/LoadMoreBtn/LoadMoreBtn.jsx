import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onMoreLoad }) => {
  return (
    <div>
      <div className={css.loadMore}>
        <button className={css.button} onClick={onMoreLoad}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
