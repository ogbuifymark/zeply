import axios from "axios";



 const getItemFromSessionStorage = (data) => {
  if (sessionStorage.getItem(data) !== "undefined") {
    return JSON.parse(sessionStorage.getItem(data));
  }
};
const baseURL = process.env.REACT_APP_BASEURL
const axiosInstance = axios.create({
  baseURL,
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getItemFromSessionStorage("accessToken");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);



export default axiosInstance;
