const LoadMoreBtn = ({ onMoreSearch }) => {
  return (
    <div>
      <div className="load-more">
        <button onClick={onMoreSearch}>Load more</button>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
