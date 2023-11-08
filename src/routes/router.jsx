import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import Home from "../pages/Home";
import ManageMyFoods from "../pages/ManageMyFoods";
import ManageMySingleFoods from "../pages/ManageMySingleFoods";
import MyRequestFood from "../pages/MyRequestFood";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../pages/PrivateRoute";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import UpdateAFood from "../pages/UpdateAFood";
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
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateAFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoute>
            <MyRequestFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-single-food/:id",
        element: (
          <PrivateRoute>
            <ManageMySingleFoods />
          </PrivateRoute>
        ),
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
