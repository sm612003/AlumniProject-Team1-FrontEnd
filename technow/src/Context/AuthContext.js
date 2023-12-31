import { createContext, useReducer, useEffect } from "react";
import axiosInstance from "../Utils/AxiosInstance.js";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Check if user data is available in local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch({ type: "login", payload: JSON.parse(storedUser) });
    }
  }, []);

  // to update the state in every time who logged in
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // Update local storage when the user logs in or logs out
    if (state.user) {
      // Only update when the user logs in
      localStorage.setItem("authUser", JSON.stringify(state.user));
    } else {
      // Only update when the user logs out
      localStorage.removeItem("authUser");
    }
  }, [state.user]);

  const setUser = (userData) => {
    dispatch({ type: "login", payload: userData });
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:5000/user/view-one/${state.user.id}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 const logout = async () => {
    console.log("Logout function called");
   try {
     await axiosInstance.post("http://localhost:5000/user/logout");
     dispatch({ type: "logout" });
   } catch (error) {
     console.error("Error logging out:", error);
   } finally {
     localStorage.clear()
   }
 };

  return (
    <AuthContext.Provider value={{ ...state, setUser, fetchUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
