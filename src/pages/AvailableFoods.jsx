import { useEffect, useState } from "react";
import SectionWrapper from "../components/layouts/SectionWrapper";
import Error from "../components/sections/Error";
import SearchFood from "../components/sections/SearchFood";
import SortFood from "../components/sections/SortFood";
import Spiner from "../components/sections/Spiner";
import NoDataInfo from "../components/shared/NoDataInfo";
import PageTitile from "../components/shared/PageTitile";
import SectionHeader from "../components/shared/SectionHeader";
import TabContent from "../components/shared/TabContent";
import useAxiosCustom from "../hooks/useAxiosCustom";
import useIsError from "../hooks/useIsError";
import useIsLoading from "../hooks/useIsLoading";
function AvailableFoods() {
  const [foods, setFoods] = useState(null);
  const axiosInstance = useAxiosCustom();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isError = useIsError(loading, error);
  const isLoading = useIsLoading(loading, error);
  const isEmpty = foods && foods.length === 0 ? true : false;

  // load all foods
  useEffect(() => {
    setLoading(true);
    setError(false);
    axiosInstance
      .get("/hunger-help/v1/foods")
      .then(({ data }) => {
        setLoading(false);
        setError(false);
        setFoods(data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [axiosInstance]);

  // search funtionality
  const handleSearch = (searchInput) => {
    const food_name = searchInput.toLowerCase().trim();
    setLoading(true);
    setError(false);
    axiosInstance
      .get(`/hunger-help/v1/foods/single?food_name=${food_name}`)
      .then(({ data }) => {
        setLoading(false);
        setError(false);
        setFoods(data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  // sort funtionality
  const handleSorting = (e) => {
    const sortObject = e.target.value;
    setError(false);
    setLoading(true);
    if (sortObject === "Short Expiry") {
      axiosInstance
        .get("/hunger-help/v1/foods/ascending-expiry")
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
    if (sortObject === "Long Expiry") {
      axiosInstance
        .get("/hunger-help/v1/foods/descending-expiry")
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
  };
  return (
    <main>
      <PageTitile title="Available Foods" />
      <SectionWrapper></SectionWrapper>
      <section
        className="pt-10 md:pt-14 "
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6 ">
            <SearchFood hanldelSearch={handleSearch} />
            <SortFood handleSorting={handleSorting} />
          </div>
        </SectionWrapper>
      </section>
      {isLoading ? (
        <Spiner />
      ) : isError ? (
        <Error />
      ) : isEmpty ? (
        <NoDataInfo>No Food Found.</NoDataInfo>
      ) : (
        <>
          <section className="pb-6 md:pb-14 lg:pb-20 ">
            <SectionWrapper>
              <SectionHeader>
                <span>Available Foods</span>
              </SectionHeader>
              <div>
                <TabContent foods={foods} loading={loading} />
              </div>
            </SectionWrapper>
          </section>
        </>
      )}
    </main>
  );
}

export default AvailableFoods;
