import PropTypes from "prop-types";

function NoDataInfo({ children }) {
  return (
    <div
      className=" h-[70vh]  flex items-center justify-center text-base md:text-xl lg:text-2xl  font-semibold text-desc-color "
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {children}
    </div>
  );
}

NoDataInfo.propTypes = {
  children: PropTypes.string,
};

export default NoDataInfo;
