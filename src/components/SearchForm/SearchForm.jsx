import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
        value={query}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
