import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NavItem({ path, children }) {
  return (
    <li>
      {" "}
      <NavLink
        to={path}
        className={({ isActive }) =>
          ` font-smibold ${
            isActive
              ? "text-sm  border-b border-opacity-20  border-primary-color bg-primary-color bg-opacity-20  hover:bg-primary-color lg:hover:bg-transparent hover:bg-opacity-20 lg:bg-transparent lg:text-primary-color lg:border-primary-color  py-2 px-4 md:px-5 rounded-none "
              : "text-sm  border-b border-opacity-30 border-primary-color lg:border-transparent lg:hover:border-primary-color  py-2 hover:bg-primary-color lg:hover:bg-transparent  hover:bg-opacity-20 lg:hover:text-primary-color  lg:hoverborder-primary-color rounded-none px-4  md:px-5  "
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  children: PropTypes.string,
  path: PropTypes.string,
};

export default NavItem;
