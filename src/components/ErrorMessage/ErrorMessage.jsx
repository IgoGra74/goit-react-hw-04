const ErrorMessage = () => {
  return <div>ErrorMessage</div>;
};

export default ErrorMessage;
// const [hasMoreResults, setHasMoreResults] = useState(true);

// const loadMoreImages = async () => {
//   try {
//     setLoading(true);
//     const nextPage = currentPage + 1;
//     const data = await fetchImagesWithTopic(topic, nextPage);
//     if (data.length === 0) {
//       setHasMoreResults(false);
//       toast.error("We're sorry, but you've reached the end of search results.");
//     } else {
//       setImages([...images, ...data]);
//       setCurrentPage(nextPage);
//     }
//   } catch (error) {
//     console.error("Error loading more images:", error);
//     toast.error(
//       "Whoops, something went wrong while loading more images. Please try again!"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

// <LoadMoreBtn onMoreSearch={loadMoreImages} hasMoreResults={hasMoreResults} />

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
