import { createContext, useContext, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);

  const accessTokenRef = useRef(null);

  const updateToken = (token) => {
    accessTokenRef.current = token;
    setAccessToken(token);
  };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = accessTokenRef.current;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!error.response) {
        toast.error("Network error. Please check your connection.");
        return Promise.reject(error);
      }

      const status = error.response.status;

      if (status === 503) {
        toast.error("Dictionary service is currently unavailable.");
      } else if (status === 429) {
        toast.error("Too many requests. Please try again later.");
      }

      const originalRequest = error.config;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newToken = res.data.accessToken;
          updateToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch {
          updateToken(null);
          setUsername(null);
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken: updateToken, username, setUsername, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
