import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import toast from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(null);
  const [topic, setTopic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (topic.length === 0) return;

    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchImagesWithTopic(topic, page);
        const totalPages = data.total_pages;

        if (data.results.length === 0) {
          setSearchError(true);
          toast.error(
            "Sorry, there are no images matching your search query. Please try again"
          );
          setShowBtn(false);
        } else {
          setSearchError(false);

          if (page <= totalPages) {
            setImages((prevImages) => [...prevImages, ...data.results]);
            setShowBtn(true);
          }
        }
      } catch (error) {
        setError(true);
        toast.error(
          "Whoops, something went wrong! Please try reloading this page!"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [topic, page]);

  const onSearchImage = (searchImage) => {
    setPage(1);
    setImages([]);
    setTopic(searchImage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const onMoreLoad = () => {
    setPage(page + 1);
  };

  return (
    <div className="app">
      <SearchBar onSearchImage={onSearchImage} />
      {error && <ErrorMessage />}
      {searchError && <ErrorMessage />}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {loading && <Loader />}
      {showBtn && images.length > 0 && !loading && (
        <LoadMoreBtn onMoreLoad={onMoreLoad} />
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          modalOpen={modalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
