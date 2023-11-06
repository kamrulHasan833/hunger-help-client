import PropTypes from "prop-types";

function SectionWrappeLgare({ children }) {
  return <div className="max-w-large mx-auto">{children}</div>;
}

SectionWrappeLgare.propTypes = {
  children: PropTypes.node,
};

export default SectionWrappeLgare;
