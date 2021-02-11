import { Box, Flex, Textarea } from "@chakra-ui/react";
import SingleBlog from "../components/blog/singleBlog";
import Layout from "../components/generic/layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();

  const addPost = () => {
    history.push("/addpost");
  };

  useEffect(() => {
    axios
      .get("/api/blogs/true")
      .then((res) => {
        setBlogs(res.data);
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

        {blogs
          .sort((a, b) => b.id - a.id)
          .map((blog) => (
            <SingleBlog {...blog} key={blog.id} />
          ))}
      </Flex>
    </Layout>
  );
};

export default MyBlog;
