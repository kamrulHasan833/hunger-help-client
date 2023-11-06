import PropTypes from "prop-types";
import { useState } from "react";

function SearchFood({ hanldelSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
  };
  return (
    <div>
      <p className="font-semibold ">Search Food:</p>
      <div className="join ">
        <div>
          <div>
            <input
              className="input input-bordered join-item focus:outline-none "
              placeholder="Search food"
              onChange={handleSearchInput}
              value={searchInput}
            />
          </div>
        </div>

        <div className="indicator">
          <button
            className="btn  join-item bg-primary-color hover:bg-secondary-color text-white "
            onClick={() => hanldelSearch(searchInput)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

SearchFood.propTypes = {
  hanldelSearch: PropTypes.func,
};

export default SearchFood;
