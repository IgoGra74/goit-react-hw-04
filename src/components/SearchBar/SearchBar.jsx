import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = form.elements.topic.value.trim();

    if (topic === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="topic"
        />
        <button className={css.button} type="submit">
          Search
        </button>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "1px",
              color: "#000000",
              background: "#fbeeee",
            },
          }}
          position="top-left"
          reverseOrder={false}
        />
      </form>
    </header>
  );
};

export default SearchBar;
