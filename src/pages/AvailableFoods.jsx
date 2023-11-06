import { useEffect, useState } from "react";
import SectionWrapper from "../components/layouts/SectionWrapper";
import SearchFood from "../components/sections/SearchFood";
import SortFood from "../components/sections/SortFood";
import SectionHeader from "../components/shared/SectionHeader";
import TabContent from "../components/shared/TabContent";
import useAxiosCustom from "../hooks/useAxiosCustom";
function AvailableFoods() {
  const [foods, setFoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosCustom();
  console.log(loading);
  // load all foods
  useEffect(() => {
    axiosInstance
      .get("/hunger-help/v1/foods")
      .then(({ data }) => {
        setLoading(false);
        setFoods(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [axiosInstance]);
  const handleSearch = (searchInput) => {
    const food_name = searchInput.toLowerCase().trim();
    setLoading(true);
    axiosInstance
      .get(`/hunger-help/v1/foods/single?food_name=${food_name}`)
      .then(({ data }) => {
        setLoading(false);
        setFoods(data);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleSorting = (e) => {
    console.log(e.target.value);
  };
  return (
    <main>
      <section className="pt-10 md:pt-14 -mb-4 md:-mb-10">
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6 ">
            <SearchFood hanldelSearch={handleSearch} />
            <SortFood handleSorting={handleSorting} />
          </div>
        </SectionWrapper>
      </section>
      <section className="pb-6 md:pb-14 lg:pb-20">
        <SectionWrapper>
          <SectionHeader>
            <span>Available Foods</span>
          </SectionHeader>
          <div>
            <TabContent foods={foods} loading={loading} />
          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}

export default AvailableFoods;
