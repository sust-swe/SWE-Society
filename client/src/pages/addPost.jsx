import { Container } from "@chakra-ui/react";
import AddPostForm from "../components/blog/addPostForm";
import Layout from "../components/generic/layout";

const AddPost = ({ userId }) => {
  return (
    <Layout>
      <Container >
      <AddPostForm />
      </Container>
    </Layout>
  );
};

export default AddPost;
