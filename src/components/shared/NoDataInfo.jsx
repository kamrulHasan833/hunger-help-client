import PropTypes from "prop-types";

function NoDataInfo({ children }) {
  return (
    <div className=" h-[70vh]  flex items-center justify-center text-base md:text-xl lg:text-2xl  font-semibold text-desc-color ">
      {children}
    </div>
  );
}

NoDataInfo.propTypes = {
  children: PropTypes.string,
};

export default NoDataInfo;
