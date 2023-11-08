import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
function useAxiosCustom() {
  return axiosInstance;
}

export default useAxiosCustom;
