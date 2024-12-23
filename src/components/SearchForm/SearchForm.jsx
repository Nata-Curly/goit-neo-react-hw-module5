import { useState } from "react";
import toast from "react-hot-toast";
import { FcSearch } from "react-icons/fc";

import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === "") {
      return toast.error("Please enter something to start your search");
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
        value={query}
        className={css.searchFormInput}
      />
      <button type="submit" className={css.searchFormBtn}>
        <FcSearch size="20px" />
      </button>
    </form>
  );
};

export default SearchForm;
