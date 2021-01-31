import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/generic/footer";
import MyNavbar from "./components/generic/navbar";
import ProtectedRoute from "./components/generic/protectedRoutes";
import NotFound from "./pages/404";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import SignIn from "./pages/signIn";

function App() {
  return (
    <Router>
      <MyNavbar/>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={SignIn} />
        <ProtectedRoute exact path="/profile" component={Profile}/>
        <ProtectedRoute exact path="/user/:id" component={Profile}/>
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
