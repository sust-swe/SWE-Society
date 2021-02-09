import { Box, Flex } from "@chakra-ui/react";
import SingleBlog from "../components/blog/singleBlog";
import Layout from "../components/generic/layout";
import { useState, useEffect } from "react";
import axios from "axios";

const MyBlog = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("/api/blogs/true").then((res) => {
            console.log(res.data);
            setBlogs(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <Layout >
            <Flex align="center" direction="column" bg="grey" overflowY="scroll">

                {blogs.map((blog) => (
                    <SingleBlog {...blog} key={blog.id} />
                ))}
            </Flex>
        </Layout>
    )
}

export default MyBlog;