import { useEffect, useState } from "react";
import useAxiosCustom from "../../hooks/useAxiosCustom";
import SectionWrapper from "../layouts/SectionWrapper";
import FeaturedFood from "../shared/FeaturedFood";
import FoodButton from "../shared/FoodButton";
import SectionHeader from "../shared/SectionHeader";
function FeaturedFoods() {
  const axiosInstance = useAxiosCustom();
  const [featuredFoods, setFeaturedFoods] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/hunger-help/v1/foods/descending-quatity")
      .then(({ data }) => {
        setLoading(false);
        return setFeaturedFoods(data);
      })
      .catch((err) => console.log(err));
  }, [axiosInstance]);
  return (
    <section>
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
    </section>
  );
}

export default FeaturedFoods;
