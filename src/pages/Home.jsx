import { useEffect } from "react";

import FeaturedFoods from "../components/sections/FeaturedFoods";
import Goals from "../components/sections/Goals";
import TabFoods from "../components/sections/TabFoods";
import PageTitile from "../components/shared/PageTitile";
function Home() {
  useEffect(() => {}, []);
  return (
    <main>
      <PageTitile title="Home" />
      <FeaturedFoods></FeaturedFoods>
      <Goals></Goals>
      <TabFoods></TabFoods>
    </main>
  );
}

export default Home;
