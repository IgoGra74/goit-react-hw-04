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

// const LoadMoreBtn = ({ onMoreSearch, hasMoreResults }) => {
//   return (
//     <div>
//       {hasMoreResults && (
//         <div className={css.loadMore}>
//           <button className={css.button} onClick={onMoreSearch}>
//             Load more
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoadMoreBtn;
// import { toast } from "react-hot-toast";
// import css from "./LoadMoreBtn.module.css";

// const LoadMoreBtn = ({ onMoreSearch, hasMoreResults }) => {
//   const handleLoadMore = () => {
//     if (hasMoreResults) {
//       onMoreSearch();
//     } else {
//       toast.error("We're sorry, but you've reached the end of search results.");
//     }
//   };

//   return (
//     <div>
//       {hasMoreResults ? (
//         <div className={css.loadMore}>
//           <button className={css.button} onClick={handleLoadMore}>
//             Load more
//           </button>
//         </div>
//       ) : null}
//     </div>
//   );
// };
