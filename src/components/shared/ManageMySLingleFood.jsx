import moment from "moment";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

function ManageMySLingleFood({ food, handleStatus }) {
  const { user } = useAuth();
  const { displayName, photoURL } = user ? user : {};
  const { _id, user_email, food_status, request_date } = food;

  const request_date_formated = moment(request_date).format(
    "hh:mm A, D MMM, YYYY"
  );

  return (
    <>
      <tr>
        <td>
          <h3 className="text-xs md:text-sm font-semibold ">{displayName}</h3>
        </td>
        <td>
          <img src={photoURL} alt="" className="w-16 md:w-20 shadow-md" />
        </td>
        <td>
          <p className="text-xs md:text-sm  ">{user_email}</p>
        </td>
        <td>
          <p className="text-xs md:text-sm ">{request_date_formated}</p>
        </td>

        <th>
          <button
            onClick={() => handleStatus(_id)}
            className={`px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm  rounded-md capitalize text-white ${
              food_status === "available"
                ? "bg-secondary-color hover:bg-primary-color  "
                : "bg-desc-color cursor-not-allowed"
            }`}
            {...{ disabled: food_status === "available" ? false : true }}
          >
            {food_status === "available" ? " Pending" : food_status}
          </button>
        </th>
      </tr>
    </>
  );
}

ManageMySLingleFood.propTypes = {
  food: PropTypes.object,
  handleStatus: PropTypes.func,
};

export default ManageMySLingleFood;
