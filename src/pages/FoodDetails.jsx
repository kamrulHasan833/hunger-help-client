import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../components/layouts/SectionWrapper";
import Error from "../components/sections/Error";
import RequestModal from "../components/sections/RequestModal";
import Spiner from "../components/sections/Spiner";
import NoDataInfo from "../components/shared/NoDataInfo";
import SectionHeader from "../components/shared/SectionHeader";
import useAxiosCustom from "../hooks/useAxiosCustom";
import useIsEmptyDatd from "../hooks/useIsEmptyData";
import useIsError from "../hooks/useIsError";
import useIsLoading from "../hooks/useIsLoading";
function FoodctDetails() {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

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
  const axiosInstance = useAxiosCustom();
  const { name, image } = donator ? donator : {};
  const dateAndTime = moment(expiry_date).format("hh:mm A, D MMM, YYYY");
  const isEmpty = useIsEmptyDatd(food, loading, error);
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

  return (
    <main>
      {isLoading ? (
        <Spiner></Spiner>
      ) : isError ? (
        <Error />
      ) : isEmpty ? (
        <NoDataInfo>No Product Details</NoDataInfo>
      ) : (
        <>
          {/* donor info section */}
          <section>
            <SectionWrapper>
              <SectionHeader>
                <span>Donor Info</span>
              </SectionHeader>

              <div className="flex justify-center">
                <div className="flex flex-col items-center ">
                  <div>
                    <img
                      src={image}
                      alt=""
                      className="w-full max-w-[150px] shadow-xl"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-lg md:text-lg font-bold mb-1 mt-2">
                      {name} <span className="font-medium">(Donator)</span>
                    </h2>
                    <p className="font-bold text-primary-color text-base md:text-lg">
                      Pickup Location:{" "}
                      <span className="text-desc-color font-medium">
                        {pickup_location}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </section>
          {/* food details section */}
          <section className="pb-10 md:pb-14 lg:pb-20">
            <div className="max-w-6xl mx-6 lg:mx-auto ">
              <SectionHeader>
                <span>Food Details</span>
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div>
                  <img src={food_image} alt="" className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg md:text-xl lg:text-3xl font-bold">
                      {food_name}
                    </h3>

                    <h3 className="text-primary-color font-bold">
                      Quantity:{" "}
                      <span className="text-black font-medium">{quantity}</span>
                    </h3>
                  </div>
                  <p className="text-primary-color font-bold">
                    Product ID:{" "}
                    <span className="text-black font-medium">{_id}</span>
                  </p>
                  <p className="text-primary-color font-bold">
                    Expiry Data:{" "}
                    <span className="text-black font-medium">
                      {dateAndTime}
                    </span>
                  </p>
                  <p className="text-primary-color font-bold">
                    Status:{" "}
                    <span className="text-black font-medium">
                      {food_status}
                    </span>
                  </p>

                  <p className="text-primary-color font-bold">
                    Additional Notes:{" "}
                    <span className="text-black font-medium">
                      {additional_notes}
                    </span>
                  </p>
                  <div>
                    <button
                      className="font-bold text-white bg-secondary-color hover:bg-primary-color px-8 md:px-14  py-3  rounded-full mt-6 md:mt-8"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <RequestModal food={food}></RequestModal>
        </>
      )}
    </main>
  );
}

export default FoodctDetails;
