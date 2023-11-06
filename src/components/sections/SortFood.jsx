import PropTypes from "prop-types";

function SortFood({ handleSorting }) {
  return (
    <div>
      <label className="flex flex-col md:items-end">
        <span className="font-semibold ">Sort Food on Expiry:</span>
        <select
          className="select select-bordered join-item focus:outline-none bg-primary-color hover:bg-white text-white hover:text-black "
          onChange={handleSorting}
          defaultValue={"--Sort Food--"}
        >
          <option disabled> --Sort-- </option>
          <option>Short Expiry</option>
          <option>Long Expiry</option>
        </select>
      </label>
    </div>
  );
}

SortFood.propTypes = {
  handleSorting: PropTypes.func,
};

export default SortFood;
