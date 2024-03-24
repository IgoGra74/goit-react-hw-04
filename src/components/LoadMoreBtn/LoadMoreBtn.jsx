import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onMoreSearch }) => {
  return (
    <div>
      <div className={css.loadMore}>
        <button className={css.button} onClick={onMoreSearch}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
