import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/generic/footer";
import MyNavbar from "./components/generic/navbar";
import ProtectedRoute from "./components/generic/protectedRoutes";
import NotFound from "./pages/404";
import Blog from "./pages/blog";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import SignIn from "./pages/signIn";
// import Administrator from "./pages/administrator";
import Gallary  from "./pages/gallary";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <MyNavbar/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/gallary" component={Gallary}/>
        {/* <Route exact path="/administrator" component={Administrator} /> */}
        <Route path="/admin" component={Admin} />
        <ProtectedRoute path="/admin" restrictedTo={["admin", "superadmin"]} component={Admin} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/user/:id" component={Profile}/>
        <ProtectedRoute exact path="/blog" component={Blog}/>
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
