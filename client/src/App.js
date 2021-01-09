import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MyNavbar from "./components/generic/navbar";
import NotFound from "./pages/404";
import Landing from "./pages/landing";

function App() {
  return (
    <Router>
      <MyNavbar/>

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
