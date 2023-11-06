import Aos from "aos";
// Import Swiper styles
import "aos/dist/aos.css";
import { useEffect } from "react";
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
    </div>
  );
}

export default App;
