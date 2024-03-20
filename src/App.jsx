// import { useState } from 'react'

import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SearchBar />
        <ErrorMessage />
        <ImageGallery />
        <Loader />
        <ImageModal />
      </div>
    </>
  );
}

export default App;
