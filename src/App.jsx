import { useState } from "react";

import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
// import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {});

  const handleSearch = async (topic) => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const data = await fetchImagesWithTopic(topic);
      setImages(data);
    } catch (error) {
      // console.error("Error fetching images:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      <ErrorMessage />
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
      <ImageModal />
    </div>
  );
}

export default App;
