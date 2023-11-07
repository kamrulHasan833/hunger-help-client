import PropTypes from "prop-types";

function NoDataInfo({ children }) {
  return (
    <div className=" h-[70vh]  flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-bold ">
      {children}
    </div>
  );
}

NoDataInfo.propTypes = {
  children: PropTypes.string,
};

export default NoDataInfo;
