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
import Gallary  from "./pages/gallary";
import Admin from "./pages/admin";
import NoticeBoard from "./pages/notice";
import NoticeView from "./pages/noticeFullView"
import Committee from "./pages/committee";
import Event from "./pages/event";
import EventDetails from "../src/components/event/eventDetails"
import AddPost from "./pages/addPost";
import CreateCommittee from "./pages/createCommittee";
import UpdateCommittee from "./pages/updateCommittee";
import MyBlog from "./pages/myBlog";
import ChangeEmail from "./pages/changeEmail";


function App() {
  return (
    <Router>
      <MyNavbar/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/gallary" component={Gallary}/>
        <Route exact path="/notice/:id" component={NoticeView}/>
        <Route exact path="/noticeboard" component={NoticeBoard}/>
        <Route exact path ="/event/:id" component={EventDetails}/>
        <Route exact path ="/event" component={Event}/>
        <ProtectedRoute path="/admin" restrictedTo={["admin", "superadmin"]} component={Admin} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/user/:id" component={Profile}/>
        <ProtectedRoute exact path="/committee" component={Committee}/>
        <ProtectedRoute exact path="/committee/create"  restrictedTo={["admin", "superadmin"]} component={CreateCommittee}/>
        <ProtectedRoute exact path="/committee/update"  restrictedTo={["admin", "superadmin"]} component={UpdateCommittee}/>
        <ProtectedRoute exact path="/addpost" component={AddPost}/>
        <ProtectedRoute exact path="/blog" component={MyBlog}/>
        <ProtectedRoute exact path="/changeemail" component={ChangeEmail}/>
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
