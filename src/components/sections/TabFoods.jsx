import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosCustom from "../../hooks/useAxiosCustom";
import SectionWrapper from "../layouts/SectionWrapper";
import SectionHeader from "../shared/SectionHeader";
import TabContent from "../shared/TabContent";
function TabFoods() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [foods, setFoods] = useState(null);
  const axiosInstance = useAxiosCustom();
  console.log(current, loading);

  useEffect(() => {
    setLoading(true);
    if (current === 0) {
      axiosInstance
        .get("/hunger-help/v1/foods/descending-quatity")
        .then(({ data }) => {
          setLoading(false);
          return setFoods(data);
        })
        .catch((err) => console.log(err));
    }

    if (current === 1) {
      axiosInstance
        .get("/hunger-help/v1/foods/ascending-expiry")
        .then(({ data }) => {
          setLoading(false);
          return setFoods(data);
        })
        .catch((err) => console.log(err));
    }
    if (current === 2) {
      axiosInstance
        .get("/hunger-help/v1/foods/descending-expiry")
        .then(({ data }) => {
          setLoading(false);
          return setFoods(data);
        })
        .catch((err) => console.log(err));
    }
  }, [axiosInstance, current]);

  console.log(foods);

  return (
    <section className=" min-h-screen pb-8 md:pb-12 lg:pb-16 ">
      <SectionWrapper>
        <SectionHeader>
          <span>Filter Foods</span>
        </SectionHeader>
        <Tabs isFitted variant="enclosed" onChange={(ci) => setCurrent(ci)}>
          <TabList mb="1em">
            <Tab>Large Quantity</Tab>
            <Tab>Short Expiry</Tab>
            <Tab>Long Expiry</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TabContent foods={foods} loading={loading} />
            </TabPanel>
            <TabPanel>
              <TabContent foods={foods} loading={loading} />
            </TabPanel>
            <TabPanel>
              <TabContent foods={foods} loading={loading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SectionWrapper>
    </section>
  );
}

export default TabFoods;
