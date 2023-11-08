import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SectionWrapper from "../components/layouts/SectionWrapper";

import ManageMySLingleFood from "../components/shared/ManageMySLingleFood";
import NoDataInfo from "../components/shared/NoDataInfo";
import useAxiosCustom from "../hooks/useAxiosCustom";

function ManageMySingleFoods() {
  const [foods, setFoods] = useState(null);
  const { id: params_id } = useParams();
  const axiosInstance = useAxiosCustom();

  useEffect(() => {
    axiosInstance
      .get(`/hunger-help/v1/request-foods/users/${params_id}`)
      .then(({ data }) => setFoods(data))
      .catch((err) => console.log(err));
  }, [params_id, axiosInstance]);
  const handleStatus = (id) => {
    const requested_food =
      id && foods && foods.length > 0
        ? foods.find(({ _id }) => id === _id)
        : null;
    const updateAbleFood = requested_food
      ? {
          ...requested_food,
          food_status: "delivered",
        }
      : null;

    const {
      food_id,
      food_name,
      food_image,
      quantity,
      donator_name,
      donator_email,
      user_email,
      expiry_date,
      request_date,
      pickup_location,
      additional_notes,
      donation_money,
      food_status,
    } = updateAbleFood;
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to accept request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .put(`/hunger-help/v1/request-foods/${id}`, {
            food_id,
            food_name,
            food_image,
            quantity,
            donator_name,
            donator_email,
            user_email,
            expiry_date,
            request_date,
            pickup_location,
            additional_notes,
            donation_money,
            food_status,
          })

          .then(({ data }) => {
            if (data.modifiedCount > 0) {
              const updateFoods =
                foods && foods.length > 0
                  ? foods.map((food) =>
                      food._id === id
                        ? { ...food, food_status: "delivered" }
                        : food
                    )
                  : null;

              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "You have delivered food   successfully.",
                showConfirmButton: false,
                timer: 1500,
              });

              setFoods(updateFoods);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <main className={"bg-white"}>
      <SectionWrapper>
        <div className="flex justify-between items-center  font-inter">
          <h3
            className={`text-xl md:text-2xl lg:text-3xl font-bold mt-12 md:mt-16 mb-6 font-inter`}
          >
            Got Requestes
          </h3>
          <Link
            to="/add-product"
            className="px-2 md:px-4 py-1 md:py-2 text-sm md:text-base text-white rounded-lg  bg-primary hover:bg-secondary"
          >
            Donate
          </Link>
        </div>

        {foods && foods.length > 0 ? (
          <>
            <div className="overflow-x-auto min-h-[50vh] pb-14 md:pb-24">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className={`text-xs md:text-sm font-bold`}>
                    <th>Requester Name</th>
                    <th>Requester Image</th>
                    <th>Requester Email</th>
                    <th>Request Time and Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <ManageMySLingleFood
                      key={food._id}
                      food={food}
                      handleStatus={handleStatus}
                    ></ManageMySLingleFood>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr className={`text-xs md:text-sm font-bold`}>
                    <th>Requester Name</th>
                    <th>Requester Image</th>
                    <th>Requester Email</th>
                    <th>Request Time and Date</th>
                    <th>Status</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <>
            {" "}
            <NoDataInfo>No Request</NoDataInfo>
          </>
        )}
      </SectionWrapper>
    </main>
  );
}
export default ManageMySingleFoods;
