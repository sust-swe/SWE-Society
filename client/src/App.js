import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Other from "./pages/other";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/otherSide">
          <Other />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
