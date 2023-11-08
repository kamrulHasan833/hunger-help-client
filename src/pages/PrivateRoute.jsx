import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Spiner from "../components/sections/Spiner";
import useAuth from "../hooks/useAuth";
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Spiner />;
  }
  return (
    <>
      {!loading && user ? (
        children
      ) : (
        <Navigate state={location} to="/signin"></Navigate>
      )}
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
