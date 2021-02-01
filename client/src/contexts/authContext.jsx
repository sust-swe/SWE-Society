import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const { createContext, useState } = require("react");

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
    setLoading(false);
    localStorage.setItem("loggedIn", JSON.stringify(true));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.removeItem("user");
    setLoggedIn(false);
    setLoading(false);
    setUser(null);
  };

  const logoutHandler = (e) => {
    logout();
    axios.post("/api/user/logout").finally(() => {
      return <Redirect to="/" />;
    });
  };

  const unauthorizedHandler = (err) => {
    if (err.response?.status === 401) {
      toast({
        title: "Session Expired!",
        description: "Please login again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      logoutHandler();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        login,
        logout,
        loading,
        logoutHandler,
        unauthorizedHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
