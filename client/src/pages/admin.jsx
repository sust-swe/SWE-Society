import { Box } from "@chakra-ui/react";
import Layout from "../components/generic/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../components/admin/dashboard";
import AddUser from "../components/admin/addUser";
import Students from "../components/admin/students";

const Message = ({ message }) => (
  <Box bg="yellow" width="100%">
    {message}
  </Box>
);

const Admin = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/admin">
            <Dashboard />
          </Route>
          <Route exact path="/admin/students">
            <Students />
          </Route>
          <Route exact path="/admin/adduser">
            <AddUser />
          </Route>
          <Route exact path="/admin/hello">
            <Message message="hello" />
          </Route>
          <Route exact path="/admin/hi">
            <Message message="hi" />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
};

export default Admin;
