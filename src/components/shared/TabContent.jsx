import PropTypes from "prop-types";
import Spiner from "../sections/Spiner";
import FeaturedFood from "./FeaturedFood";

function TabContent({ foods, loading }) {
  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {!loading &&
            foods &&
            foods.length > 0 &&
            foods.map((food) => <FeaturedFood key={food._id} food={food} />)}
        </div>
      )}
    </>
  );
}

TabContent.propTypes = {
  foods: PropTypes.array,
  loading: PropTypes.bool,
};

export default TabContent;
