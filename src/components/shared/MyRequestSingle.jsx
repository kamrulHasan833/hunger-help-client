import moment from "moment";
import PropTypes from "prop-types";

function MyRequestSingle({ food, handleDelete }) {
  const {
    _id,
    donator_name,
    expiry_date,
    pickup_location,
    food_status,
    request_date,
    donation_money,
  } = food;

  const request_date_formated = moment(request_date).format(
    "hh:mm A, D MMM, YYYY"
  );
  const dateAndTime = moment(expiry_date).format("hh:mm A, D MMM, YYYY");
  return (
    <>
      <tr>
        <td>
          <h3 className="text-xs md:text-sm font-semibold ">{donator_name}</h3>
        </td>
        <td>
          <h3 className="text-xs md:text-sm capitalize ">{pickup_location}</h3>
        </td>
        <td>
          <p className="text-xs md:text-sm ">{dateAndTime}</p>
        </td>
        <td>
          <p className="text-xs md:text-sm ">{request_date_formated}</p>
        </td>
        <td>
          <p className="text-xs md:text-sm ">${donation_money}</p>
        </td>
        <td>
          <p className="text-xs text-primary-color md:text-sm font-bold  capitalize">
            {food_status === "available" ? (
              "Pending.."
            ) : (
              <span className="text-desc-color">{food_status}</span>
            )}
          </p>
        </td>
        <th>
          <button
            onClick={() => handleDelete(_id)}
            className={`px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm  rounded-md text-white ${
              food_status === "available"
                ? "bg-secondary-color hover:bg-opacity-50"
                : " bg-desc-color cursor-not-allowed"
            }`}
            {...{ disabled: food_status === "available" ? false : true }}
          >
            Cancel
          </button>
        </th>
      </tr>
    </>
  );
}

MyRequestSingle.propTypes = {
  food: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default MyRequestSingle;
