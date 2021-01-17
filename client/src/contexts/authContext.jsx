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

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
