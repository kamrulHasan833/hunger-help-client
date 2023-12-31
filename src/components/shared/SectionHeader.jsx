import PropTypes from "prop-types";

function SectionHeader({ children }) {
  return (
    <div
      className="pt-10 md:pt-16 pb-6 md:pb-10 font-inter"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1
        className={`text-3xl text-titile-color lg:text-4xl capitalize text-center font-semibold `}
      >
        {children}
      </h1>
    </div>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node,
};

export default SectionHeader;
