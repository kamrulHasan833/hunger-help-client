import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SectionWrapper from "../layouts/SectionWrapper";

function Slide({ slide }) {
  const { title, image, desc } = slide;

  return (
    <div className=" relative">
      <div>
        <div className='"bg-transparent relative'>
          <img
            src={image}
            alt=""
            className="transition-[3s] w-full"
            data-aos="zoom-out"
            data-aos-duration="2000"
          />
          <div className="absolute top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-[2]"></div>
        </div>
      </div>
      <SectionWrapper>
        <div className="absolute left-0 top-0 w-full h-full pl-6 md:pl-10 xl:pl-0 z-[3] text-center flex flex-col items-center justify-center">
          <p
            className={`text-primary-color font-medium text-base md:text-lg uppercase max-w-[200px]  lg:text-center`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {desc}
          </p>
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl text-white 2xl:text-7xl font-bold max-w-full mb-0 md:mb-2 capitalize`}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            {title}
          </h1>

          <Link
            className="bg-secondary-color px-7 py-2 md:px-10 md:py-3 rounded-full text-white hover:bg-primary-color font-bold text-sm md:text-base lg:text-lg mt-3 md:mt-6"
            to="/available-foods"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            Get Food
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}

Slide.propTypes = {
  slide: PropTypes.object,
};

export default Slide;
