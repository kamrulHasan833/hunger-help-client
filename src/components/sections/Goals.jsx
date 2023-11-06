import { useEffect, useState } from "react";
import SectionWrapper from "../layouts/SectionWrapper";
import Goal from "../shared/Goal";
import SectionHeader from "../shared/SectionHeader";
function Goals() {
  const [goals, setGoals] = useState(null);

  useEffect(() => {
    fetch(`${location.origin}/goals.json`)
      .then((res) => res.json())
      .then((goals) => setGoals(goals))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section>
      <SectionWrapper>
        <SectionHeader>
          <span>Our Goals</span>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals && goals.length > 0
            ? goals.map((goal) => <Goal key={goal.id} goal={goal}></Goal>)
            : ""}
        </div>
      </SectionWrapper>
    </section>
  );
}

export default Goals;
