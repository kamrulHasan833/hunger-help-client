import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionWrapper from "../components/layouts/SectionWrapper";
import MyRequestSingle from "../components/shared/MyRequestSingle";
import NoDataInfo from "../components/shared/NoDataInfo";
import useAuth from "../hooks/useAuth";
import useAxiosCustom from "../hooks/useAxiosCustom";
function MyRequestFood() {
  const [foods, setFoods] = useState(null);

  const axiosInstance = useAxiosCustom();
  const { user } = useAuth();
  const { email } = user ? user : {};
  useEffect(() => {
    axiosInstance
      .get(`/hunger-help/v1/request-foods?email=${email}`)
      .then(({ data }) => setFoods(data))
      .catch((err) => console.log(err));
  }, [email, axiosInstance]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you wanna delete this request, click Ok!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/hunger-help/v1/request-foods/${id}`)

          .then(({ data }) => {
            if (data.deletedCount > 0) {
              const updateProduct = foods.filter(
                (product) => product._id !== id
              );

              Swal.fire({
                icon: "success",

                title: "Success!",
                text: "You have deleted request successfully.",
                showConfirmButton: false,
                timer: 1500,
              });

              setFoods(updateProduct);
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
            My Requested Foods
          </h3>
          <Link
            to="/available-foods"
            className="px-2 md:px-4 py-1 md:py-2 text-sm md:text-base text-white rounded-lg  bg-primary hover:bg-secondary"
          >
            All Foods
          </Link>
        </div>

        {foods && foods.length > 0 ? (
          <>
            <div className="overflow-x-auto min-h-[50vh] pb-14 md:pb-24">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className={`text-xs md:text-sm font-bold`}>
                    <th>Doanator Name</th>
                    <th>Pickup Location</th>
                    <th>Expiry Date</th>
                    <th>Request Date</th>
                    <th>Donation Money</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <MyRequestSingle
                      key={food._id}
                      food={food}
                      handleDelete={handleDelete}
                    ></MyRequestSingle>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr className={`text-xs md:text-sm font-bold`}>
                    <th>Doanator Name</th>
                    <th>Pickup Location</th>
                    <th>Expiry Date</th>
                    <th>Request Date</th>
                    <th>Donation Money</th>
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
            <NoDataInfo>Empty Request</NoDataInfo>
          </>
        )}
      </SectionWrapper>
    </main>
  );
}
export default MyRequestFood;
