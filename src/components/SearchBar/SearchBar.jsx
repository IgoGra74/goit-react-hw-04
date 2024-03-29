import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SearchBar = ({ onSearchImage }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = form.elements.topic.value.trim();

    if (topic === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSearchImage(topic);
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
        <ErrorMessage />
      </form>
    </header>
  );
};

export default SearchBar;
