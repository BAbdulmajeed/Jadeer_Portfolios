import axios from "axios";

// create API root point
const API = axios.create({ baseURL: "http://localhost:8000" });

//adds access token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//check responses
API.interceptors.response.use(

  //if response is vaild return as is
  (response) => response,

  //if response is an error
  async (error) => {
    const originalRequest = error.config;


    //check the API route 
    const isAuthRoute = originalRequest.url?.includes("/auth/")

    //if error comes from auth endpoint component will handle it
    if (isAuthRoute) {
      return Promise.reject(error)
    }

    // If unauthorized direct to unauthorized page
    if (error.response?.status === 401) {
      // clear token
      localStorage.removeItem("access_token");
      window.location.href = "http://localhost:5173/unauthorized";
    }

    

    // if not found direct to not found page
    if (error.response?.status === 403 || error.response?.status === 404) {
      window.location.href = "http://localhost:5173/*"
    }

    // if info sent is not vaild alert user 
    if (error.response?.status === 422) {
      alert("enter valid information")
    }

    // return error as is
    return Promise.reject(error);
  }
);

export default API;