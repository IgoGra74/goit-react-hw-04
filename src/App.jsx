import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import "./App.css";

ReactModal.setAppElement("#root");

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";

function App() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1); // Начальная страница теперь 1
  const [topic, setTopic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Изменение начального состояния на null

  useEffect(() => {
    if (topic.length === 0) return;

    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchImagesWithTopic(topic, page);
        if (data.results.length === 0) {
          // Исправление проверки на длину результата
          setSearchError(true);
          toast.error(
            "Sorry, there are no images matching your search query. Please try again"
          );
        } else {
          setSearchError(false);

          setImages(data.results);
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

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      setPage(page + 1);
      // const nextPage = page + 1;
      const data = await fetchImagesWithTopic(topic, page);
      setImages((prevImages) =>
        prevImages ? [...prevImages, ...data.results] : []
      );
    } catch (error) {
      console.error("Error loading more images:", error);
      toast.error(
        "Whoops, something went wrong while loading more images. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const onSearchImage = (searchImage) => {
    // setPage(1); // Сброс страницы при новом поиске
    setTopic(searchImage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null); // Закрытие модального окна путем сброса выбранного изображения
  };

  return (
    <div className="app">
      <SearchBar onSearchImage={onSearchImage} />
      {error && <Toaster position="top-left" reverseOrder={false} />}
      {searchError && <Toaster position="top-left" reverseOrder={false} />}
      {images && <ImageGallery images={images} onImageClick={openModal} />}
      {loading && <Loader />}
      {images && !loading && <LoadMoreBtn onMoreSearch={loadMoreImages} />}
      <ReactModal
        isOpen={selectedImage !== null} // Проверка на null вместо false
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Selected Image Modal"
        overlayClassName="overlay"
        className="modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            position: "absolute",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
            borderRadius: "3px",
            outline: "none",
          },
        }}
      >
        {selectedImage && <ImageModal image={selectedImage} />}
      </ReactModal>
    </div>
  );
}

export default App;
