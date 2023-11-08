import HeadRoom from "react-headroom";
import { Link } from "react-router-dom";
import SectionWrapper from "../layouts/SectionWrapper";
import NavbarEnd from "../shared/NavBarEnd";
import NavItem from "../shared/NavItem";
/* eslint-disable react/no-unknown-property */
function Navbar() {
  const navItems = (
    <>
      <NavItem path="/"> Home</NavItem>
      <NavItem path="/available-foods"> Available Foodes</NavItem>
      <NavItem path="/add-food"> Add Food</NavItem>
      <NavItem path="/manage-my-foods"> Manage My Foods</NavItem>
      <NavItem path="/my-food-requests"> My Food Requests</NavItem>
    </>
  );
  return (
    <HeadRoom>
      <SectionWrapper>
        <div className="navbar bg-base-100 md:py-4">
          <div className="navbar-start">
            <div className="dropdown ">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 px-0  bg-base-100 rounded-sm w-80 md:w-[500px] pb-0 shadow-xl "
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="normal-case text-xl">
              <img
                className="w-48"
                src="https://i.ibb.co/Pg0xjpR/logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <NavbarEnd></NavbarEnd>
          </div>
        </div>
      </SectionWrapper>
    </HeadRoom>
  );
}

export default Navbar;
