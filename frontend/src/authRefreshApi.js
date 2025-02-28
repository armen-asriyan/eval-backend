import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Configure axios instance
const authRefreshApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Add a request interceptor
authRefreshApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // The request that triggered the error

    // If the response status code is 401 (Unauthorized) and the request has not been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        await authRefreshApi.get("/api/auth/refresh"); // Refresh the access token

        return authRefreshApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Return the original error
  }
);

export default authRefreshApi;
