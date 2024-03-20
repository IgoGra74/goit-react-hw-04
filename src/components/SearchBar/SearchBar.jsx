import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = evt.target.elements.topic.value.trim();

    if (topic === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="topic"
        />
        <button type="submit">Search</button>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              // padding: "2px",
              color: "#713200",
              // background: "green",
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
