import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AllPosts from "../components/blog/allPosts";
import Layout from "../components/generic/layout";
import { BlogProvider } from "../contexts/blogContext";

const Blog = ({ userId }) => {
  return (
    <BlogProvider>
      <Layout>
        <AllPosts />
        <Link to="/addpost">
          <IconButton
            colorScheme="green"
            position="sticky"
            bottom="15px"
            left="100%"
            mb={3}
            mr={3}
            fontSize="25px"
            isRound
            icon={<AddIcon />}
          />
        </Link>
      </Layout>
    </BlogProvider>
  );
};

export default Blog;
