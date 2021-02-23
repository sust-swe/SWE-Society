import { Box, Flex, Textarea } from "@chakra-ui/react";
import SingleBlog from "../components/blog/singleBlog";
import Layout from "../components/generic/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BlogSkeleton from "../components/blog/blogskeleton";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();
  const [requestState, setRequestState] = useState("loading");

  const addPost = () => {
    history.push("/addpost");
  };

  useEffect(() => {
    axios
      .get("/api/blogs/true")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
        setRequestState("loaded");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Flex align="center" direction="column" overflowY="scroll">
        <Box padding="5" mt="2" width="3xl" bg="whitesmoke" onClick={addPost}>
          <Textarea
            borderRadius="2xl"
            bg="lightgray"
            placeholder="Create a blog"
          />
        </Box>
        {requestState === "loading" && <BlogSkeleton />}

        {blogs.map((blog) => (
          <SingleBlog {...blog} key={blog.id} />
        ))}
      </Flex>
    </Layout>
  );
};

export default MyBlog;
