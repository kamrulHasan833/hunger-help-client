import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function FoodButton({ children, className, path }) {
  return (
    <Link
      to={path}
      className={` text-sm font-bold ${
        className ? className : "bg-secondary-color hover:bg-primary-color"
      } text-white px-7 py-2 rounded-full `}
    >
      {children}
    </Link>
  );
}

FoodButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  path: PropTypes.string,
};

export default FoodButton;
