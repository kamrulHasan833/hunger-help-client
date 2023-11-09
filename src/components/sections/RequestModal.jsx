import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosCustom from "../../hooks/useAxiosCustom";

function RequestModal({ food }) {
  const axioInstance = useAxiosCustom();
  const { user } = useAuth();
  const { displayName, email: userEmail } = user;

  const {
    _id,
    food_name,
    food_image,
    quantity,
    donator,
    expiry_date,
    pickup_location,
    additional_notes,
    food_status,
  } = food;
  const { name, email } = donator ? donator : {};
  const currentDateMili = Date.now();
  const currentDate = moment(currentDateMili).format("hh:mm A, D MMM, YYYY");
  const dateAndTime = moment(expiry_date).format("hh:mm A, D MMM, YYYY");
  const navigate = useNavigate();
  //   handle create request
  const handleCreateRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAddition_notes = form.additionalNotes.value;
    const finalAdditionalNotes = newAddition_notes
      ? newAddition_notes
      : additional_notes;
    const donationMoney = parseFloat(form.donationMoney.value);

    axioInstance
      .post("/hunger-help/v1/request-foods", {
        food_id: _id,
        food_name,
        food_image,
        quantity,
        donator_name: name,
        donator_email: email,
        user_email: userEmail,
        expiry_date,
        request_date: currentDate,
        pickup_location,
        additional_notes: finalAdditionalNotes,
        donation_money: donationMoney,
        food_status: food_status,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          navigate("/my-food-requests");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box  max-w-2xl max-h-auto rounded-md">
        <div className={`hero font-inter `}>
          <div className="w-full ">
            <div className="text-center mb-1">
              <h1 className={`text-xl text-title-color  font-bold `}>
                Give Some Info
              </h1>
              <p
                className={`mt-2 pb-1 text-sm
                `}
              >
                If you want donte money or food, you can.
              </p>
            </div>
            <div className={`w-full border `}>
              <form className=" p-6 " onSubmit={handleCreateRequest}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* left */}
                  <div className="  space-y-2">
                    <div className="form-control">
                      <div>
                        <img src={food_image} alt="" className="w-24 md:w-28" />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Food Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={food_name}
                        defaultValue={food_name}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>

                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs `}>Food Id</span>
                      </label>
                      <input
                        type="text"
                        placeholder={_id}
                        defaultValue={_id}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Donator Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={name}
                        defaultValue={name}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Donator Email
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={email}
                        defaultValue={email}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Your Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={displayName}
                        defaultValue={displayName}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                  </div>
                  {/* rigth */}
                  <div className=" flex-wrap space-y-2">
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Your Email
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={userEmail}
                        defaultValue={userEmail}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Quantity
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={quantity}
                        defaultValue={quantity + " " + "  (persons food)"}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Pickup Location
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={pickup_location}
                        defaultValue={pickup_location}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Request Date
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={currentDate}
                        defaultValue={currentDate}
                        className="input input-bordered text-xs h-7"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Expiry Date
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={dateAndTime}
                        defaultValue={dateAndTime}
                        className="input input-bordered text-xs h-7"
                        name="dateAndTime"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Additional Notes (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Give additional notes"
                        defaultValue={additional_notes}
                        className="input input-bordered text-xs h-7"
                        name="additionalNotes"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-[1px]">
                        <span className={`label-text text-xs py-0`}>
                          Donation Money (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Donation amount"
                        className="input input-bordered cus text-xs h-7"
                        name="donationMoney"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-control mt-6 text-center flex items-center">
                  <div className="flex items-center gap-6">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full text-sm font-bold   bg-primary-color  text-white border-none hover:bg-secondary-color"
                    >
                      Confirm
                    </button>

                    <span
                      onClick={() =>
                        document.getElementById("my_modal_1").close()
                      }
                      className="px-5 py-2 rounded-full text-sm bg-secondary-color font-bold hover:bg-primary-color cursor-pointer text-white border-none "
                    >
                      Cancel
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

RequestModal.propTypes = {
  food: PropTypes.object,
};
export default RequestModal;
