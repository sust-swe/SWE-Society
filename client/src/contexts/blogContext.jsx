import axios from "axios";
import { AuthContext } from "./authContext";

const { createContext, useState, useContext } = require("react");

const BlogContext = createContext();

const BlogProvider = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allPostsLoading, setAllPostsLoading] = useState(true);
  const { unauthorizedHandler } = useContext(AuthContext);

  const getAllPosts = () => {
    setAllPostsLoading(true);
    axios
      .get("/api/blogs/true")
      .then((res) => {
        setAllPosts(res.data);
        setAllPostsLoading(false);
      })
      .catch((err) => unauthorizedHandler(err));
  };

  return (
    <BlogContext.Provider
      value={{ allPosts, getAllPosts, setAllPosts, allPostsLoading }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
