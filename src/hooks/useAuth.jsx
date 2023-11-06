import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
export default useAuth;
