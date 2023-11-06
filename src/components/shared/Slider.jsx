import PropTypes from "prop-types";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Slide from "./Slide";
function Slider({ slides }) {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={30}
      slidesPerView={1}
      navigation={true}
      pagination={{
        clickable: true,
        bulletActiveClass: "bg-dark w-10 opacity-100 rounded-xl",
      }}
      modules={[Navigation, Autoplay, Pagination, EffectFade]}
      className={`hero-swiper w-full mySwiper`}
      effect="fade"
    >
      {slides.length > 0 &&
        slides.map((slide, ind) => (
          <SwiperSlide key={ind}>
            {({ isActive }) => isActive && <Slide slide={slide}></Slide>}
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
Slider.propTypes = {
  slides: PropTypes.array,
};
export default Slider;
