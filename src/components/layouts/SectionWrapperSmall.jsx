import PropTypes from "prop-types";

function SectionWrapperSmall({ children }) {
  return <div className="max-w-secondary mx-6 lg:mx-auto">{children}</div>;
}

SectionWrapperSmall.propTypes = {
  children: PropTypes.node,
};

export default SectionWrapperSmall;
