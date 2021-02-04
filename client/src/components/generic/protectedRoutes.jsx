import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
