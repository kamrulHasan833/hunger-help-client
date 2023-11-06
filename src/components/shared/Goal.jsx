import PropTypes from "prop-types";
import Tilt from "react-parallax-tilt";
function Goal({ goal }) {
  const { title, image, short_description } = goal;
  return (
    <div className="relative">
      <Tilt>
        <div className="">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 group"></div>
          <img
            src={image}
            alt=""
            className="transition-[1s] group-hover:scale-110"
          />
        </div>
        <div className="absolute top-1 left-0 flex w-full h-full justify-center items-center flex-col ">
          {" "}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-color ">
            {title}
          </h3>
          <p className="max-w-[300px] text-center text-gray-300">
            {short_description}
          </p>
          <button className="bg-secondary-color text-sm font-bold hover:bg-primary-color text-white px-7 py-2 rounded-full mt-2 md:mt-4 ">
            Donate Food
          </button>
        </div>
      </Tilt>
    </div>
  );
}

Goal.propTypes = {
  goal: PropTypes.object,
};

export default Goal;
