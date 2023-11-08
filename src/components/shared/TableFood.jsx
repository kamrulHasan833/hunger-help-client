import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function TableFood({ food, handleDelete }) {
  const {
    _id,
    food_name,
    food_image,
    quantity,
    donator,
    expiry_date,
    pickup_location,
    food_status,
  } = food;
  const { image, name } = donator;
  const formatedExpiry_date = moment(expiry_date).format("DD MMM, yyy");

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-24 lg:w-48  rounded">
                <img src={food_image} />
              </div>
            </div>
          </div>
        </td>
        <td>
          <h3 className="text-sm md:text-base font-medium">{food_name}</h3>
        </td>

        <td>
          <p className="text-sm md:text-base font-medium">
            {formatedExpiry_date}
          </p>
        </td>
        <td>
          <p className="text-sm md:text-base  font-medium">{pickup_location}</p>
        </td>
        <td>
          <p className="text-sm md:text-base  font-medium">{quantity} ( per)</p>
        </td>
        <td>
          <div className="flex flex-col items-center">
            {" "}
            <img src={image} alt="" className=" rounded-full w-12" />
            <p className="text-xs   text-center">{name}</p>
          </div>
        </td>

        <td>
          <p
            className={`text-sm md:text-base ${
              food_status === "available"
                ? "bg-primary-color "
                : "bg-desc-color"
            } font-medium  text-white px-2 py-1 rounded-md capitalize`}
          >
            {food_status}
          </p>
        </td>
        <th>
          <div className="flex flex-col items-center gap-1">
            <Link
              to={`/manage-single-food/${_id}`}
              className="text-xs bg-yellow-600 hover:bg-primary-color  text-white px-2 py-1 rounded-md"
            >
              Manage
            </Link>
            <Link
              to={`/update-food/${_id}`}
              className=" text-xs bg-primary-color hover:bg-secondary-color text-white px-2 py-1 rounded-md"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="text-xs bg-secondary-color hover:bg-primary-color  text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </th>
      </tr>
    </>
  );
}

TableFood.propTypes = {
  food: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default TableFood;
