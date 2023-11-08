import { useEffect, useState } from "react";
import useAxiosCustom from "../../hooks/useAxiosCustom";
import useIsError from "../../hooks/useIsError";
import useIsLoading from "../../hooks/useIsLoading";
import SectionWrapper from "../layouts/SectionWrapper";
import Error from "../sections/Error";
import Spiner from "../sections/Spiner";
import FeaturedFood from "../shared/FeaturedFood";
import FoodButton from "../shared/FoodButton";
import NoDataInfo from "../shared/NoDataInfo";
import SectionHeader from "../shared/SectionHeader";
function FeaturedFoods() {
  const axiosInstance = useAxiosCustom();
  const [featuredFoods, setFeaturedFoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isError = useIsError(loading, error);
  const isLoading = useIsLoading(loading, error);
  const isEmpty = featuredFoods && featuredFoods.length === 0 ? true : false;

  useEffect(() => {
    axiosInstance
      .get("/hunger-help/v1/foods/descending-quatity")
      .then(({ data }) => {
        setLoading(false);
        setError(false);
        return setFeaturedFoods(data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [axiosInstance]);
  return (
    <section>
      {isLoading ? (
        <Spiner />
      ) : isError ? (
        <Error />
      ) : isEmpty ? (
        <NoDataInfo>No Food Found.</NoDataInfo>
      ) : (
        <SectionWrapper>
          <SectionHeader>
            <span>featured Foods</span>
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!loading && featuredFoods && featuredFoods.length > 0 ? (
              featuredFoods.map((featuredFood) => (
                <FeaturedFood
                  key={featuredFood._id}
                  food={featuredFood}
                ></FeaturedFood>
              ))
            ) : (
              <p>loading...</p>
            )}
          </div>
          <div className="text-center pt-10 md:pt-14">
            <FoodButton
              path="available-foods"
              className="bg-primary-color hover:bg-secondary-color py-3 md:text-base"
            >
              All Foods
            </FoodButton>
          </div>
        </SectionWrapper>
      )}
    </section>
  );
}

export default FeaturedFoods;
