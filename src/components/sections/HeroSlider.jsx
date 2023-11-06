import SectionWrappeLgare from "../layouts/SectionWrappeLgare";
import Slider from "../shared/Slider";

const slides = [
  {
    id: 1,
    title: "Feel Free to Get Food",
    image: "https://i.ibb.co/TmFmLvZ/banner1.jpg",

    desc: "Get Food",
  },
  {
    id: 2,
    title: "No people should live in hungry",
    image: "https://i.ibb.co/vzKxM4Q/banner2.jpg",

    desc: "Donate food",
  },
];

function HeroSlider() {
  return (
    <SectionWrappeLgare>
      <Slider grow="flex-grow " slides={slides}></Slider>
    </SectionWrappeLgare>
  );
}

export default HeroSlider;
