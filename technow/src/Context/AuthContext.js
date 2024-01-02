// import { createContext, useReducer, useEffect } from "react";
// import axiosInstance from "../Utils/AxiosInstance.js";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "login":
//       return { user: action.payload };
//     case "logout":
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,// default value user=null
//   });

//   // Check if user data is available in local storage on mount . if yes login , if no => null the user so in every open for website local will be null , don't save the info of last user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     if (storedUser) {
//       dispatch({ type: "login", payload: JSON.parse(storedUser) });
//     }
//   }, []);

//   // to update the state in every time who logged in
//   useEffect(() => {
//     localStorage.setItem("state", JSON.stringify(state.user));
//   }, [state]);

//   useEffect(() => {
//     // Update local storage when the user logs in or logs out
//     if (state.user) {
//       // Only update when the user logs in
//       localStorage.setItem("authUser", JSON.stringify(state.user));

//     }
//     // else {
//     //   // Only update when the user logs out
//     //   localStorage.removeItem("authUser");
//     // }
//   }, [state.user]);

//   const setUser = (userData) => {
//     dispatch({ type: "login", payload: userData });
//     localStorage.setItem("authUser", JSON.stringify(userData));
//     console.log("userdata:",userData)

//   };

// const fetchUserData = async () => {
//     try {
//       const authUser = JSON.parse(localStorage.getItem("authUser"));

//       if (!authUser || !authUser.user.id) {
//         console.error("Invalid user data in local storage");
//         return;
//       }

//       const response = await axiosInstance.get(
//         `http://localhost:5000/user/view-one/${authUser.user.id}`
//       );
//           console.log("Response from server:", response);

//       setUser(response.data.user);
//       console.log("User data fetched successfully:", response);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//  const logout = async () => {
//     console.log("Logout function called");
//    try {
//      await axiosInstance.post("http://localhost:5000/user/logout");
//      dispatch({ type: "logout" });
//    } catch (error) {
//      console.error("Error logging out:", error);
//    } finally {
//      localStorage.clear()
//    }
//  };
/////////////////////////////////////////////////////////////////////////////
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

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch({ type: "login", payload: JSON.parse(storedUser) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state.user));
  }, [state]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("authUser", JSON.stringify(state.user));
    }
  }, [state.user]);

  const setUser = (userData) => {
    dispatch({ type: "login", payload: userData });
    localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("state", JSON.stringify(userData));

    console.log("userdata:", userData);
  };

const fetchUserData = async () => {
  try {
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    if (!authUser || !authUser.user.id) {
      console.error("Invalid user data in local storage");
      return;
    }

    const response = await axiosInstance.get(
      `http://localhost:5000/user/view-one/${authUser.user.id}`
    );

    console.log("Response from server:", response);

    if (response.status === 200 && response.data && response.data.User) {
      setUser(response.data.User); // Update this line
      console.log("User data fetched successfully:", response.data.User);
    } else {
      console.error("Invalid user data in the response:", response);
    }
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
      localStorage.clear();
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, setUser, fetchUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
