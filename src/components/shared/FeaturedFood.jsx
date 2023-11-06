import moment from "moment";
import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";
import FoodButton from "./FoodButton";

function FeaturedFood({ food }) {
  const {
    _id,
    food_name,
    food_image,
    quantity,
    donator,
    expiry_date,
    pickup_location,
    additional_notes,
  } = food;
  const dateAndTime = moment(expiry_date).format("hh:mm A, D MMM, YYYY");
  const { name, image } = donator;
  return (
    <div className="cursor-pointer">
      <Tilt className="mb-2">
        <div>
          <img
            src={food_image ? food_image : ""}
            alt=""
            className="rounded-t-sm  shadow-xl"
          />
        </div>
      </Tilt>
      <div>
        {/* doanator info */}
        <div className="flex items-center gap-2">
          <div>
            <img
              src={image ? image : ""}
              alt=""
              className="w-10 rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {name ? name : ""}{" "}
              <span className="font-normal capitalize">(donator)</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="md:text-xl font-bold mb-[2px]">
            {food_name ? food_name : ""}
          </h3>
          <h3 className="text-sm  font-bold text-primary-color ">
            Quantity:{" "}
            <span className="font-normal text-gray-500">
              {quantity ? quantity : 0}
            </span>
          </h3>
        </div>

        <div>
          <p className="text-sm text-primary-color font-bold mb-[1px]">
            Expiry Date:{" "}
            <span className="font-normal text-gray-500 ">{dateAndTime}</span>
          </p>{" "}
          <p className="text-sm text-primary-color font-bold mb-[1px]">
            Pickup Loaction:{" "}
            <span className="font-normal text-gray-500">
              {" "}
              {pickup_location.length > 30
                ? pickup_location.slice(0, 30) + "..."
                : pickup_location}
            </span>
          </p>{" "}
          <p className="text-sm text-primary-color  font-bold  mb-[1px]">
            Addition Notes:{" "}
            <span className="font-normal text-gray-500">
              {" "}
              {additional_notes.length > 30
                ? additional_notes.slice(0, 30) + "..."
                : additional_notes}
            </span>
          </p>
        </div>
        <div className="pt-4 md:pt-5">
          <FoodButton path={`/food-details/${_id}`}>Details</FoodButton>
        </div>
      </div>
    </div>
  );
}

FeaturedFood.propTypes = {
  food: PropTypes.object,
};

export default FeaturedFood;
