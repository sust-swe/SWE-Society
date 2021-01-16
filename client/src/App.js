import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MyNavbar from "./components/generic/navbar";
import NotFound from "./pages/404";
import Landing from "./pages/landing";
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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
