import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
function useAxiosCustom() {
  return axiosInstance;
}

export default useAxiosCustom;
