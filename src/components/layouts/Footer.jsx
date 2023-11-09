import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import SectionWrapper from "./SectionWrapper";

function Footer() {
  return (
    <footer className="bg-black">
      <SectionWrapper>
        <div className="footer p-10 text-base-content justify-between">
          <nav>
            <header className="footer-title text-primary-color opacity-100  ">
              <Link to="/">
                <img
                  src="https://i.ibb.co/Pg0xjpR/logo.png"
                  alt=""
                  className="w-48"
                />
              </Link>
            </header>
            <a className="link link-hover text-gray-400">
              Contact: +3584573969890 ,+3584573969891{" "}
            </a>
            <a className="link tex-base link-hover text-gray-400">
              Loacation: 333 Maple Street, Riverside, USA
            </a>
          </nav>
          <nav>
            <header className="footer-title text-primary-color opacity-100 ">
              Organization
            </header>
            <a className="link link-hover text-gray-400">About us</a>
            <a className="link link-hover text-gray-400">Terms of use</a>
            <a className="link link-hover text-gray-400">Cookie policy</a>
            <a className="link link-hover text-gray-400">Privacy policy</a>
            <a className="link link-hover text-gray-400">Enterprise</a>
          </nav>
          <nav>
            <header className="footer-title text-primary-color opacity-100">
              Social
            </header>
            <a className="link link-hover text-gray-400">Facebook</a>
            <a className="link link-hover text-gray-400">Twitter</a>
            <a className="link link-hover text-gray-400">Github</a>
            <a className="link link-hover text-gray-400">Instagram</a>
            <div className="grid grid-flow-col gap-4">
              <BsFacebook className="link link-hover text-3xl md:4xl bg-white text-blue-600 rounded-sm" />
              <BsTwitter className="link link-hover text-3xl md:4xl bg-white text-sky-500 rounded-lg" />
              <BsLinkedin className="link link-hover  text-blue-500 bg-white text-3xl md:4xl rounded-lg" />
              <BsInstagram className="link link-hover text-pink-500 text-3xl md:4xl" />
            </div>
          </nav>
        </div>
        <aside>
          <p className="text-sm text-center pt-0 pb-4 md:pb-6 text-yellow-600">
            Copyright © 2023 - All right reserved by Hunger Help Org.
          </p>
        </aside>
      </SectionWrapper>
    </footer>
  );
}

export default Footer;
