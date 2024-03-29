import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

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

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalOpen]);

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
      {images && <ImageGallery images={images} onImageClick={openModal} />}
      {loading && <Loader />}
      {showBtn && images.length > 0 && !loading && (
        <LoadMoreBtn onMoreLoad={onMoreLoad} />
      )}

      <Modal
        isOpen={selectedImage !== null}
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
      </Modal>
    </div>
  );
}

export default App;
