import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <p className=" text-base md:text-xl text-red-500 text-center">
        Some unexpected orror occured!
      </p>
      <div>
        {" "}
        <Link
          to="/"
          className=" text-xs md:text-sm font-semibold  btn-primary rounded-full bg-primary-color border-none px-3 py-2 md:py-4 md:px-6  hover:bg-secondary-color"
        >
          Cotinue Exploare
        </Link>
      </div>
    </div>
  );
}

export default Error;
