import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function NavbarEnd() {
  const { user, loading, signout } = useAuth();
  const { displayName, photoURL } = user ? user : {};
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If wanna logout, click Ok!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        signout();
        Swal.fire("Success!", "You have  logged out successfully.", "success");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className={`text-xl md:2xl text-dark px-1 rounded-full mr-1`}></div>
      {/* user dropdown */}
      {user && !loading && (
        <div className={`dropdown dropdown-bottom dropdown-end `}>
          <div
            tabIndex={0}
            className=" m-1 w-10  rounded-full border cursor-pointer"
          >
            <img
              src={
                photoURL ? photoURL : "https://i.ibb.co/6s4PzKR/no-avater.jpg"
              }
              alt=""
              className=" rounded-full "
            />
          </div>
          <ul
            tabIndex={0}
            className={`dropdown-content z-50 menu p-2 shadow rounded-box w-52 bg-white`}
          >
            <li>
              <div className="flex flex-col   items-center gap-1">
                <div tabIndex={0} className=" m-1 w-14  rounded-full border ">
                  <img
                    src={
                      photoURL
                        ? photoURL
                        : "https://i.ibb.co/vV9hYVf/no-avater.jpg"
                    }
                    alt=""
                    className=" rounded-full "
                  />
                </div>
                {displayName && (
                  <h3
                    className={` text-xs md:text-smtext-title-color font-medium text-center hover:bg-transparent`}
                  >
                    {displayName && displayName}
                  </h3>
                )}
              </div>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn bg-transparent border-none  bg-opacity-5 text-secondary capitalize pt-3"
              >
                <span className=" text-lg  sm:text-xl -mr-1">
                  <BiLogOutCircle></BiLogOutCircle>
                </span>{" "}
                logout
              </button>
            </li>
          </ul>
        </div>
      )}
      {!user && !loading && (
        <Link
          to="/signin"
          className="btn text-primary bg-transparent border-none hover:bg-primary bg-opacity-5 text-base font-medium hover:text-white capitalize "
        >
          Login
        </Link>
      )}
    </>
  );
}

export default NavbarEnd;
