import AddPostPopover from "../components/blog/addPostPopover";
import AllPosts from "../components/blog/allPosts";
import Layout from "../components/generic/layout";
import { BlogProvider } from "../contexts/blogContext";

const Blog = ({ userId }) => {
  return (
    <BlogProvider>
      <Layout>
        <AllPosts />
        <AddPostPopover />
      </Layout>
    </BlogProvider>
  );
};

export default Blog;
