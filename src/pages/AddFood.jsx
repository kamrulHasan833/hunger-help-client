import moment from "moment";
import Swal from "sweetalert2";
import SectionWrapperSmall from "../components/layouts/SectionWrapperSmall";
import PageTitile from "../components/shared/PageTitile";
import useAuth from "../hooks/useAuth";
import useAxiosCustom from "../hooks/useAxiosCustom";
function AddFood() {
  const { user } = useAuth();
  const axiosInstance = useAxiosCustom();
  const { displayName, email, photoURL } = user;
  const currentDate = moment(Date.now()).format("yyy-MM-DDTHH:mm");

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const quantity = form.quantity.value;
    const pickup_location = form.pickup_location.value;
    const expiry_date = moment(
      form.expiry_date.value,
      "yyy-MM-DDTHH:mm"
    ).valueOf();

    const additional_notes = form.additional_notes.value;

    const food = {
      food_name,
      food_image,
      quantity,
      donator: {
        name: displayName,
        email,
        image: photoURL,
      },
      expiry_date,
      pickup_location,
      additional_notes,
      food_status: "available",
    };

    axiosInstance
      .post("/hunger-help/v1/foods", food)

      .then(({ data }) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You have added food successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // reset the form
        form.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <PageTitile title="Add Food" />
      <SectionWrapperSmall>
        <div
          className={`hero pt-14 md:pt-20 pb-14 md:pb-20 font-inter `}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="w-full ">
            <div className="text-center lg:text-left mb-5 md:mb-6">
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-title-color`}
              >
                Add Food
              </h1>
              <p className={`mt-2 pb-6 `}>
                Please add a food by fill in the flowing fields.
              </p>
            </div>
            <div className={`w-full border `}>
              <form className=" p-6 " onSubmit={handleCreateProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* left */}
                  <div className="  space-y-2">
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Food Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Food Name"
                        className="input input-bordered"
                        name="food_name"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}> Food Image</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Food image"
                        className="input input-bordered"
                        name="food_image"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>
                          Food Quantity (How many people may eat){" "}
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="Food Quantity"
                        className="input input-bordered"
                        name="quantity"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Pickup Location</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Pickup Location"
                        className="input input-bordered"
                        name="pickup_location"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>
                          Expiry Date & Time
                        </span>
                      </label>
                      <input
                        type="datetime-local"
                        placeholder="Expiry date"
                        defaultValue={currentDate}
                        className="input input-bordered"
                        name="expiry_date"
                        required
                      />
                    </div>
                  </div>

                  {/* rigth */}
                  <div className=" flex-wrap space-y-2">
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>
                          {" "}
                          Additional Notes (optional)
                        </span>
                      </label>
                      <textarea
                        type="text"
                        placeholder="Additional notes"
                        className="input input-bordered"
                        name="additional_notes"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Food Status</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Food status"
                        defaultValue="available"
                        className="input input-bordered"
                        name="food_status"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Donator Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Donato Name"
                        defaultValue={displayName}
                        className="input input-bordered"
                        name="donator_name"
                        disabled
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Donator Image</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Donator Image URL"
                        defaultValue={photoURL}
                        className="input input-bordered"
                        name="donator_image"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className={`label-text `}>Donator Email</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Donator email"
                        defaultValue={email}
                        className="input input-bordered"
                        name="donator_email"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="form-control mt-6 text-center flex items-center">
                  <button className="btn w-1/4 btn-primary border-none rounded-full bg-primary-color hover:bg-secondary-color text-white">
                    Add Food
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </SectionWrapperSmall>
    </main>
  );
}
export default AddFood;
