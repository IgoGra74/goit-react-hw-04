import { useState } from "react";

import "./App.css";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
// import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);
  // useEffect(() => {});

  const handleSearch = async (topic) => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const data = await fetchImagesWithTopic(topic);
      if (data.length === 0) {
        setSearchError(true);
        toast.error(
          "Sorry, there are no images matching your search query. Please try again"
        );
      } else {
        setSearchError(false);
        setImages(data);
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
  const loadMoreImages = async (topic) => {
    try {
      setLoading(true);
      const nextPage = page + 1; // Увеличение номера страницы
      const data = await fetchImagesWithTopic(topic, nextPage); // Передача нового номера страницы в fetchImagesWithTopic
      setImages([...images, ...data]); // Добавление новых изображений к существующим
      setPage(nextPage); // Обновление текущей страницы
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
      {images.length > 0 && <ImageGallery images={images} />}
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
      <ImageModal />
    </div>
  );
}

export default App;
