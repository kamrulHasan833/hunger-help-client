import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function PageTitile({ title }) {
  return (
    <Helmet>
      <title>Hunger Help || {title}</title>
    </Helmet>
  );
}

PageTitile.propTypes = {
  title: PropTypes.string,
};

export default PageTitile;
