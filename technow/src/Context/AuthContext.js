import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/AxiosInstance.js";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);

  useEffect(() => {
    if (!user && user === null) {
      fetchUserData();
    } else {
      console.log("loggedin");
    }
  }, [user]);
  

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axios.get(
        `http://localhost:5000/user/view-one/${user.id}`
      );
      setUser(response.user.data);
      console.log("responseee" + response);
    } catch (err) {
      setUser(null);
    } finally {
      setCheckUser(false);
    }
  };

  const logout = async () => {
    await axiosInstance.post("user/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, checkUser, fetchUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
