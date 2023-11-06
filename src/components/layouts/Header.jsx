import { useLocation } from "react-router-dom";
import HeroSlider from "../sections/HeroSlider";
import Navbar from "../sections/Navbar";

function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <Navbar></Navbar>
      {pathname === "/" && <HeroSlider></HeroSlider>}
    </header>
  );
}

export default Header;
