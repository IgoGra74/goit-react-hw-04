// import { useState } from 'react'

import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";

function App() {
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      // setImages([]);
      // setError(false);
      // setLoading(true);
      const data = await fetchImagesWithTopic(topic);
      console.log(data);
      // setImages(data);
    } catch (error) {
      // setError(true);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ErrorMessage />
      <ImageGallery />
      <Loader />
      <ImageModal />
    </>
  );
}

export default App;
