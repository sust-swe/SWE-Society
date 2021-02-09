import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Box, Divider, Flex, IconButton, Image, Spacer, Text, Textarea } from "@chakra-ui/react";
import Layout from "../generic/layout";
import ShowComment from "./showComment";
import WriteComment from "./writeComment";
import MultipleGridImages from 'react-multiple-image-grid'
import { useContext, useState, useEffect } from "react";
import EventCarousal from "../event/eventCarousal";

const SingleBlog = (blog) => {


    return (
        <Box padding="5" mt="2" width="3xl" bg="whitesmoke">
            <Flex align="center" direction="row" >
                <Avatar margin={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Text fontSize="xl" >{blog.user.name}</Text><br></br>
                <Spacer />
                <IconButton align="center" icon={<DeleteIcon h={6} w={6} mr="5" justifyContent="end" color="red" />} />
            </Flex>
            <Flex direction="column">
                <Text padding="2" fontWeight="bold" fontSize="lg" >{blog.title}</Text>
                <Text ml={2}>{new Date(blog.createdAt).getUTCDay()}/{new Date(blog.createdAt).getUTCMonth()}/{new Date(blog.createdAt).getUTCFullYear()}: {new Date(blog.createdAt).getUTCHours()}</Text>
            </Flex>

            <Box padding={2} >
                <Text>{blog.content}</Text>
            </Box>
            <Box  >
                
            {blog.image.map((img) => (
                    <Image mt={2} cursor="pointer" src={img} />
                ))}

                
                {/* <MultipleGridImages images={blog.image} /> */}
            </Box>
            <Divider mt={2} mb={2} orientation="horizontal" />

            <WriteComment {...blog} />

            <Divider mt={1} mb={1} orientation="horizontal" />

            {blog.comments.map((comment) => (
                <ShowComment {...comment} key={comment.id} />
            ))}
        </Box>
    )
}

export default SingleBlog;