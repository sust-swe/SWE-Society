import Layout from "../components/generic/layout";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import ApproveBlogCard from "../components/blog/approveBlogCard";
import { Flex } from "@chakra-ui/react";
const ApproveBlog = () => {
  const [unApprovedBlogs, setunApprovedBlogs] = useState([]);
  const { unauthorizedHandler } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blogs/false")
      .then((res) => {
        console.log(res.data);
        setunApprovedBlogs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Flex justifyContent="center">
        {unApprovedBlogs.map((blog) => (
          <ApproveBlogCard {...blog} key={blog.id} />
        ))}
      </Flex>
    </Layout>
  );
};

export default ApproveBlog;
