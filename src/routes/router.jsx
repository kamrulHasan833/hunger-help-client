import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import Home from "../pages/Home";
import MyRequestFood from "../pages/MyRequestFood";
import NotFound from "../pages/NotFound";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
        loader: async ({ params }) =>
          await fetch(
            `http://localhost:5000/hunger-help/v1/foods/single/${params.id}`
          ),
      },
      {
        path: "/my-food-requests",
        element: <MyRequestFood />,
      },
      {
        path: "/add-food",
        element: <AddFood />,
      },
    ],

    errorElement: <NotFound></NotFound>,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export default router;
