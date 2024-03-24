import { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";

ReactModal.setAppElement("#root");

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (topic) => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const data = await fetchImagesWithTopic(topic, currentPage);
      if (data.length === 0) {
        setSearchError(true);
        toast.error(
          "Sorry, there are no images matching your search query. Please try again"
        );
      } else {
        setSearchError(false);
        setImages(data);
        setTopic(topic);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(true);
      toast.error(
        "Whoops, something went wrong! Please try reloading this page!"
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image); // При кліку на зображення встановлюємо обране зображення
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setSelectedImage(null); // Закриття модального вікна
  };

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await fetchImagesWithTopic(topic, nextPage);
      setImages([...images, ...data]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more images:", error);
      toast.error(
        "Whoops, something went wrong while loading more images. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      {error && <Toaster position="top-left" reverseOrder={false} />}
      {searchError && <Toaster position="top-left" reverseOrder={false} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && (
        <div className="loading">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onMoreSearch={loadMoreImages} />
      )}
      <ReactModal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Selected Image Modal"
        // overlayClassName="overlay"
        // className="modal"
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
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {selectedImage && <ImageModal image={selectedImage} />}
      </ReactModal>
    </div>
  );
}

export default App;
