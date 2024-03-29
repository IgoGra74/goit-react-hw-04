// import { useEffect, useState, useRef } from "react";
// import Modal from "react-modal";
// import "./App.css";

// Modal.setAppElement("#root");

// import ImageGallery from "./components/ImageGallery/ImageGallery";
// import SearchBar from "./components/SearchBar/SearchBar";
// import { fetchImagesWithTopic } from "./images-api";
// import toast, { Toaster } from "react-hot-toast";
// import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
// import ImageModal from "./components/ImageModal/ImageModal";
// import Loader from "./components/Loader/Loader";

// function App() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [searchError, setSearchError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [topic, setTopic] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showBtn, setShowBtn] = useState(false);
//   const totalPagesRef = useRef(0);

//   useEffect(() => {
//     if (topic.length === 0) return;

//     async function fetchImages() {
//       try {
//         setError(false);
//         setLoading(true);

//         const data = await fetchImagesWithTopic(topic, page);
//         totalPagesRef.current = data.total_pages;

//         if (data.results.length === 0) {
//           setSearchError(true);

//           toast.error(
//             "Sorry, there are no images matching your search query. Please try again"
//           );
//         } else {
//           setSearchError(false);

//           setImages(data.results);
//         }
//       } catch (error) {
//         setError(true);
//         toast.error(
//           "Whoops, something went wrong! Please try reloading this page!"
//         );
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchImages();
//   }, [topic, page]);

//   const onSearchImage = (searchImage) => {
//     setPage(1);
//     setTopic(searchImage);
//   };
//   const onMoreLoad = () => {
//     setPage(page + 1);
//     // totalPagesRef.current = Math.max(totalPagesRef.current, page + 1);
//     if (totalPagesRef.current < page) {
//       setShowBtn(true);
//     }
//   };

//   const openModal = (image) => {
//     setSelectedImage(image);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="app">
//       <SearchBar onSearchImage={onSearchImage} />
//       {error && <Toaster position="top-left" reverseOrder={false} />}
//       {searchError && <Toaster position="top-left" reverseOrder={false} />}
//       {images && <ImageGallery images={images} onImageClick={openModal} />}
//       {loading && <Loader />}
//       {!showBtn && images.length > 0 && !loading && (
//         <LoadMoreBtn onMoreLoad={onMoreLoad} />
//       )}

//       <Modal
//         isOpen={selectedImage !== null}
//         onRequestClose={closeModal}
//         shouldCloseOnOverlayClick={true}
//         shouldCloseOnEsc={true}
//         contentLabel="Selected Image Modal"
//         overlayClassName="overlay"
//         className="modal"
//         style={{
//           overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           },
//           content: {
//             position: "absolute",
//             overflow: "hidden",
//             WebkitOverflowScrolling: "touch",
//             borderRadius: "3px",
//             outline: "none",
//           },
//         }}
//       >
//         {selectedImage && <ImageModal image={selectedImage} />}
//       </Modal>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

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
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const onMoreLoad = () => {
    setPage(page + 1);
  };

  return (
    <div className="app">
      <SearchBar onSearchImage={onSearchImage} />
      {error && <Toaster position="top-left" reverseOrder={false} />}
      {searchError && <Toaster position="top-left" reverseOrder={false} />}
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
