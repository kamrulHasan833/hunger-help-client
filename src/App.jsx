import Aos from "aos";
// Import Swiper styles
import BackToUp from "@uiw/react-back-to-top";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { HiOutlineArrowLongUp } from "react-icons/hi2";
import { Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className=" font-raleway">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      <BackToUp
        className="group  mr-6 md:mr-10 mb-10 z-30"
        size={50}
        strokeWidth={2}
      >
        <HiOutlineArrowLongUp className="text-primary-color transition text-2xl group-hover:-translate-y-1"></HiOutlineArrowLongUp>
      </BackToUp>
    </div>
  );
}

export default App;
