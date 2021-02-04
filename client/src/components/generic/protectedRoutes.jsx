import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProtectedRoute = ({ component: Component, restrictedTo, ...rest }) => {
  const { loggedIn, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn && restrictedTo) {
          return restrictedTo.includes(user.credential.role) ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect to="/" />
          );
        } else if (loggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
