import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SectionWrapperSmall from "../components/layouts/SectionWrapperSmall";
import Error from "../components/sections/Error";
import Spiner from "../components/sections/Spiner";
import NoDataInfo from "../components/shared/NoDataInfo";
import PageTitile from "../components/shared/PageTitile";
import useAxiosCustom from "../hooks/useAxiosCustom";
import useIsEmptyData from "../hooks/useIsEmptyData";
import useIsError from "../hooks/useIsError";
import useIsLoading from "../hooks/useIsLoading";

function UpdateAFood() {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const {
    _id,
    food_name,
    food_image,
    quantity,
    expiry_date,
    donator,
    pickup_location,
    additional_notes,
    food_status,
  } = food;
  const axiosInstance = useAxiosCustom();
  const { email, name, image } = donator ? donator : {};

  const isEmpty = useIsEmptyData(food, loading, error);
  const isError = useIsError(loading, error);
  const isLoading = useIsLoading(loading, error);

  useEffect(() => {
    axiosInstance
      .get(`/hunger-help/v1/foods/single/${id}`)
      .then(({ data }) => {
        setError(false);
        setLoading(false);
        setFood(data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [axiosInstance, id]);

  const modified_expiry_date = moment(expiry_date).format("yyy-MM-DDTHH:mm");
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const quantity = form.quantity.value;
    const pickup_location = form.pickup_location.value;
    const donator_image = form.donator_image.value;
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
        name,
        email,
        image: donator_image,
      },
      expiry_date,
      pickup_location,
      additional_notes,
      food_status: "available",
    };

    axiosInstance
      .put(`/hunger-help/v1/foods/users/${_id}`, food)

      .then(({ data }) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You have updated food successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className={` "bg-white" `}>
      <PageTitile title="Update Product" />
      <>
        {isLoading ? (
          <Spiner />
        ) : isError ? (
          <Error />
        ) : isEmpty ? (
          <NoDataInfo>No Food </NoDataInfo>
        ) : (
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
                    Update Food
                  </h1>
                  <p className={`mt-2 pb-6 `}>
                    Please update food by fill in the flowing fields.
                  </p>
                </div>
                <div className={`w-full border `}>
                  <form className=" p-6 " onSubmit={handleUpdateProduct}>
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
                            defaultValue={food_name}
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
                            defaultValue={food_image}
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
                            defaultValue={quantity}
                            className="input input-bordered"
                            name="quantity"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className={`label-text `}>
                              Pickup Location
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Pickup Location"
                            defaultValue={pickup_location}
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
                            defaultValue={modified_expiry_date}
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
                            defaultValue={additional_notes}
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
                            defaultValue={food_status}
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
                            defaultValue={name}
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
                            defaultValue={image}
                            className="input input-bordered"
                            name="donator_image"
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
                      <button className="btn w-1/4 btn-primary rounded-full bg-primary-color border-none  hover:bg-secondary-color">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </SectionWrapperSmall>
        )}
      </>
    </main>
  );
}
export default UpdateAFood;
