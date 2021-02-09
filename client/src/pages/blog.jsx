import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PostThumb from "../components/blog/postThumb";
import Layout from "../components/generic/layout";

const Blog = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs/true").then((res) => {
      console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <Layout>
      <Container p={3} maxW="4xl" centerContent minH="70vh">
        {posts.map((post) => (
          <PostThumb {...post} key={post.title} />
        ))}
      </Container>
    </Layout>
  );
};

export default Blog;
