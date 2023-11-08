import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://hunger-help-server.vercel.app",
  withCredentials: true,
});
function useAxiosCustom() {
  return axiosInstance;
}

export default useAxiosCustom;
