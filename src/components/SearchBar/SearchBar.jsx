const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const topic = evt.target.elements.topic.value.trim();
    console.log(form);
    // if (form.elements.topic.trim() === "") {
    //   alert("Please enter search term!");
    //   return;
    // }
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
      </form>
    </header>
  );
};

export default SearchBar;
