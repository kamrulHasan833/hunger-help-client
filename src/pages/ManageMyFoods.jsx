import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionWrapper from "../components/layouts/SectionWrapper";
import Error from "../components/sections/Error";
import Spiner from "../components/sections/Spiner";
import NoDataInfo from "../components/shared/NoDataInfo";
import TableFood from "../components/shared/TableFood";
import useAuth from "../hooks/useAuth";
import useAxiosCustom from "../hooks/useAxiosCustom";
import useIsError from "../hooks/useIsError";
import useIsLoading from "../hooks/useIsLoading";
function ManageMyFoods() {
  const [foods, setFoods] = useState(null);
  const axiosInstance = useAxiosCustom();
  const { user } = useAuth();
  const { email } = user ? user : {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isError = useIsError(loading, error);
  const isLoading = useIsLoading(loading, error);
  const isEmpty = foods && foods.length === 0 ? true : false;

  // load Foods
  useEffect(() => {
    setLoading(true);
    setError(false);
    if (email) {
      axiosInstance
        .get(`/hunger-help/v1/foods/users?email=${email}`)
        .then(({ data }) => {
          setLoading(false);
          setError(false);
          setFoods(data);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
  }, [axiosInstance, email]);
  useEffect(() => {}, [foods]);
  const handleDelete = (id) => {
    setLoading(true);
    setError(false);
    Swal.fire({
      title: "Are you sure?",
      text: "If you wanna delete this food, click Ok!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/hunger-help/v1/foods/users/${id}`)
          .then(({ data }) => {
            if (data.deletedCount > 0) {
              const updateFoods = foods.filter((foods) => foods._id !== id);
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "You have deleted food successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              setLoading(false);
              setError(false);
              setFoods(updateFoods);
            }
          })
          .catch(() => {
            setLoading(false);
            setError(true);
          });
      }
    });
  };
  return (
    <main className={"bg-white"}>
      {isLoading ? (
        <Spiner />
      ) : isError ? (
        <Error />
      ) : isEmpty ? (
        <NoDataInfo>No Food Found</NoDataInfo>
      ) : (
        <SectionWrapper>
          <div className="flex justify-between items-center  font-inter">
            <h3
              className={`text-xl md:text-2xl lg:text-3xl font-bold mt-12 md:mt-16 mb-6 font-inter `}
            >
              My Foods
            </h3>
            <Link
              to="/foods/add-food"
              className="px-2 md:px-4 py-1 md:py-2 text-sm md:text-base text-white  bg-primary-color hover:bg-secondary-color rounded-full"
            >
              Donate More
            </Link>
          </div>

          {foods && foods.length > 0 ? (
            <>
              <div className="overflow-x-auto min-h-[50vh] pb-14 md:pb-24">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr
                      className={` text-sm text-primary-color md:text-base text-center `}
                    >
                      <th>Food Image</th>
                      <th>Food Name</th>
                      <th>Expiry Date</th>
                      <th>Pickup Location</th>
                      <th>Quantity</th>
                      <th>Donor</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map((food) => (
                      <TableFood
                        key={food._id}
                        food={food}
                        handleDelete={handleDelete}
                      ></TableFood>
                    ))}
                  </tbody>
                  {/* foot */}
                  <tfoot>
                    <tr
                      className={` text-sm text-primary-color md:text-base text-center `}
                    >
                      <th>Food Image</th>
                      <th>Food Name</th>
                      <th>Expiry Date</th>
                      <th>Pickup Location</th>
                      <th>Quantity</th>
                      <th>Donor</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          ) : (
            <>
              {" "}
              <NoDataInfo>No Food</NoDataInfo>
            </>
          )}
        </SectionWrapper>
      )}
    </main>
  );
}
export default ManageMyFoods;
