import AddPostForm from "../components/blog/addPostForm";
import Layout from "../components/generic/layout";

const AddPost = ({ userId }) => {
  return (
    <Layout>
      <AddPostForm />
    </Layout>
  );
};

export default AddPost;
