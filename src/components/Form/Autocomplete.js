import React, { useState } from "react";
import { Link } from "react-router-dom";

import MaterialIcon from "material-icons-react";

const Autocomplete = ({ callback, closeMenu }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  /**
   * Set search term value on input change
   *
   * @param {Event} e - input field's event object
   */
  const onInputChange = e => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  /**
   * Search posts if the user inputs at least 3 characters
   * otherwise reset the form
   *
   * @param {Event} e - form's event object
   */
  const onSubmit = e => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      callback({ searchTerm }).then(response => {
        setResults(response.data.data);
      });
    } else {
      resetForm();
    }
  };

  /**
   * Clear autocomplete results container and search input field
   */
  const resetForm = () => {
    const width = window.innerWidth;
    if (width > 1050) {
      // Immediate form reset causes missbehavior on router link
      // therefore the workaround with timeout
      setTimeout(() => {
        setSearchTerm("");
        setResults([]);
      }, 100);
    }
  };

  return (
    <div className="Autocomplete">
      <div className="Autocomplete__input">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter search term..."
            name="post"
            value={searchTerm}
            onChange={onInputChange}
            onBlur={resetForm}
            autoComplete="off"
          />
          <MaterialIcon icon="search" color="#bcbec0" size={25} />
        </form>
      </div>
      {results.length ? (
        <div className="Autocomplete__results">
          {results.map((result, index) => {
            return (
              <Link
                to={`/blogger/post#${result._id}`}
                className="Autocomplete__result-item"
                key={index}
                onClick={closeMenu}
              >
                <span>{result.title}</span>
                <img src={result.featured_image} alt="Post" />
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
