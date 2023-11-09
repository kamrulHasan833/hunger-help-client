import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import SectionWrapperSmall from "../components/layouts/SectionWrapperSmall";
import LoginButton from "../components/shared/LoginButton";
import PageTitile from "../components/shared/PageTitile";
import useAuth from "../hooks/useAuth";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    error: newError,
    signup,
    loginWithGoogle,

    auth,
  } = useAuth();

  const [error, setError] = useState("");

  const navigate = useNavigate();
  // login with google
  const googleLogin = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have signed in successfully.",
          icon: "success",
          confirmButtonColor: "#22015B",
          confirmButtonText: "Go On",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        setError(err);
      });
  };

  // Handle register with with email and password
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const image = target.image.value;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const uppercasePassword = /[A-Z]/;
    // eslint-disable-next-line no-useless-escape
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    if (password.length < 6) {
      setError("Password is less than 6 charecters!");
    } else if (!uppercasePassword.test(password)) {
      setError("Password don't have a capital letter!");
    } else if (!specialCharacterRegex.test(password)) {
      setError("Password  don't have a special character!");
    } else if (newError) {
      setError(newError.code);
    } else {
      // register
      signup(email, password)
        .then(() => {
          // update profile
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
          })
            .then(() => {
              Swal.fire({
                title: "Success!",
                text: "You have signed in successfully.",
                icon: "success",
                confirmButtonColor: "#22015B",
                confirmButtonText: "Go On",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/");
                }
              });
            })
            .catch((err) => setError(err));
        })
        .catch((err) => setError(err));
    }

    // reset input fields
    // target.reset();
    // target.name.value = "";
    // target.email.value = "";
    // target.password.value = "";
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SectionWrapperSmall>
      <PageTitile title="Sign UP" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center  md:shadow-lg md:px-10">
        <div className=" col-span-2 hidden md:block">
          {" "}
          <img
            src="https://i.ibb.co/WsN9sr4/logo.png"
            alt=""
            className="w-full"
          />
        </div>
        <div className=" font-inter rounded-md pt-14 md:pt:20 pb-14 md:pb-20 col-span-1 md:col-span-3">
          <div className=" border  px-3 sm:px-10 py-6 sm:py-20  rounded-md ">
            <h3 className=" text-3xl md:text-5xl font-semibold text-primary-color text-center ">
              Sign Up
            </h3>
            <LoginButton googleLogin={googleLogin}>
              Sign up with Google
            </LoginButton>
            <form onSubmit={handleSubmit} className="card-body p-0 pt-5 ">
              <div className="form-control">
                <label className="label">
                  <span className=" text-primary-color">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your image url"
                  className="input input-bordered"
                  name="image"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className=" text-primary-color">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
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
                  <span className=" text-primary-color">Password</span>
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
              </div>
              <div className="text-center mt-6">
                <input
                  type="submit"
                  value="Signup"
                  className="bg-secondary-color text-white text-base md:text-xl font-semibold rounded-md  px-6 md:px-20  py-2 md:py-3 hover:bg-primary-color  border-none "
                />
              </div>
            </form>
            <div>
              <p
                className={`label-text-alt text-base sm:text-lg text-red-500 text-center pt-5  ${
                  error ? "block" : "hidden"
                }`}
              >
                {error && error.code === "auth/email-already-in-use"
                  ? "User already exist against this email!"
                  : error}
              </p>
              <p className="label-text-alt font-normal text-base sm:text-lg text-gray-600 text-center pt-5 ">
                Already have an account? Please{" "}
                <Link
                  to="/signin"
                  className="text-primary-color  link link-hover font-semibold sm:text-xl"
                >
                  login
                </Link>{" "}
                now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapperSmall>
  );
}

export default Signup;
