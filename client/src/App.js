import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/generic/footer";
import MyNavbar from "./components/generic/navbar";
import NotFound from "./pages/404";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import SignIn from "./pages/signIn";

function App() {
  return (
    <Router>
      <MyNavbar/>
      
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
