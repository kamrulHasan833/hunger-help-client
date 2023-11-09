import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionWrapperSmall from "../components/layouts/SectionWrapperSmall";
import LoginButton from "../components/shared/LoginButton";
import PageTitile from "../components/shared/PageTitile";
import useAuth from "../hooks/useAuth";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();

  const [error, setError] = useState(false);
  const { signin, loginWithGoogle } = useAuth();

  const navigate = useNavigate();

  // login with google
  const googleLogin = () => {
    setError(false);

    loginWithGoogle()
      .then(() => {
        // navigate to

        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully.",
          icon: "success",
          confirmButtonColor: "#22015B",
          confirmButtonText: "Go On",
        }).then((result) => {
          if (result.isConfirmed) {
            if (!state) {
              navigate("/");
            } else {
              navigate(state.pathname, {
                state: state.state,
              });
            }
          }
        });
      })
      .catch((err) => {
        setError(err);
      });
  };

  // login with email and password
  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;

    // signin
    signin(email, password)
      .then(() => {
        // navigate to
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully.",
          icon: "success",
          confirmButtonColor: "#22015B",
          confirmButtonText: "Go On",
        }).then((result) => {
          if (result.isConfirmed) {
            if (!state) {
              navigate("/");
            } else {
              navigate(state.pathname, {
                state: state.state,
              });
            }
          }
        });
      })
      .catch((err) => {
        setError(err);
      });

    // reset input fields
    target.email.value = "";
    target.password.value = "";
  };
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={` bg-white `}>
      <PageTitile title="Sign In" />
      <SectionWrapperSmall>
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center  md:shadow-lg md:px-10"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className=" col-span-2 hidden md:block">
            {" "}
            <img
              src="https://i.ibb.co/WsN9sr4/logo.png"
              alt=""
              className="w-full"
            />
          </div>
          <div className=" font-inter rounded-md pt-14 md:pt:20 pb-14 md:pb-20 col-span-1 md:col-span-3">
            <div className="border md:border  px-3 sm:px-10 py-6 sm:py-20  rounded-md ">
              <h3 className=" text-3xl md:text-5xl font-semibold text-primary-color text-center ">
                Login
              </h3>
              <LoginButton googleLogin={googleLogin}>
                Login with Google
              </LoginButton>
              <form
                onSubmit={handleLogin}
                className="card-body p-0 pt-5 sm:pt-10 "
              >
                <div className="form-control">
                  <label className="label">
                    <span className=" text-primary-color">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your  email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-base text-primary-color">
                      Password
                    </span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your  password"
                      className="input input-bordered w-full"
                      name="password"
                      required
                    />
                    <span
                      onClick={handleShow}
                      className=" absolute right-3 top-3 cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className=" text-title-color text-2xl "></AiOutlineEyeInvisible>
                      ) : (
                        <AiOutlineEye className=" text-title-color text-2xl "></AiOutlineEye>
                      )}
                    </span>
                  </div>

                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt text-base sm:text-lg link link-hover text-primary-color"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="text-center mt-6">
                  <input
                    type="submit"
                    className="bg-secondary-color text-white text-base md:text-xl font-semibold rounded-md  px-6 md:px-20  py-2 md:py-3 hover:bg-primary-color  border-none "
                    value="Login"
                  />
                </div>
              </form>
              <div>
                <p
                  className={`label-text-alt text-base sm:text-lg text-red-500 text-center pt-5 md:pt-8 ${
                    error ? "block" : "hidden"
                  }`}
                >
                  {error.code === "auth/invalid-login-credentials" &&
                    "Email or Password was not matched!"}
                </p>
                <p className="label-text-alt font-normal text-base sm:text-lg text-gray-600 text-center pt-5 md:pt-8">
                  Do not have an account? Please{" "}
                  <Link
                    to="/signup"
                    className="text-primary-color  link link-hover font-semibold"
                  >
                    sign up
                  </Link>{" "}
                  now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapperSmall>
    </section>
  );
}

export default Signin;
