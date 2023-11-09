import { Link } from "react-router-dom";
import SectionWrapper from "../components/layouts/SectionWrapper";

function NotFound() {
  return (
    <main>
      <SectionWrapper>
        <div className=" font-inter text-center h-[100vh] flex flex-col justify-center items-center">
          <div className="flext justify-center items-center">
            <img
              src="https://i.ibb.co/p6HNFSH/not-found.jpg"
              alt=""
              className="max-w-xl"
            />
          </div>

          <Link
            className="bg-primary-color text-white text-base md:text-xl font-semibold rounded-md  px-5 md:px-4 py-2 md:py-3 hover:bg-secondary-color  border-none"
            to="/"
          >
            Go Home
          </Link>
        </div>
      </SectionWrapper>
    </main>
  );
}

export default NotFound;
