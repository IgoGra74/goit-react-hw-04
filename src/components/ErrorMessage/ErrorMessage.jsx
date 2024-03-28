const ErrorMessage = () => {
  return <div>ErrorMessage</div>;
};

export default ErrorMessage;

// const loadMoreImages = async () => {
//   try {
//     setLoading(true);
//     setPage(page + 1);
//     // const nextPage = page + 1;
//     const data = await fetchImagesWithTopic(topic, page);
//     setImages((prevImages) =>
//       prevImages ? [...prevImages, ...data.results] : []
//     );
//   } catch (error) {
//     console.error("Error loading more images:", error);
//     toast.error(
//       "Whoops, something went wrong while loading more images. Please try again!"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
// setImages((prevImages) => {
//   return [...prevImages, ...data.results];
// });
