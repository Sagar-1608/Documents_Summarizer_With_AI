import { useEffect, useState } from "react";
import { axiosInstance } from "../services/apiconnector";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axiosInstance.get("/auth/me"); 
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  return isAuthenticated;
}
