import { Avatar, Box, Flex, Text, Textarea, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
const WriteComment = (blog) => {

    const { unauthorizedHandler } = useContext(AuthContext);
    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();
    const [comment, setComment] = useState({
        content: "",
        blog_id: blog.id
    });

    useEffect(() => {

    }, [comment])



    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
           
        
        e.preventDefault();
        setRequestState("loading");

        axios
            .post(`/api/comments/`, comment)
            .then((res) => {
                setRequestState("success");
                setComment({})
                history.go(0);
            })
            .catch((err) => {
                unauthorizedHandler(err);
                toast({
                    title: "Something Went Wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                setRequestState("error");
            });
        }
    };

    return (
        <Flex pb={1} mr="10" >
            
            <Avatar size="lg" margin={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Textarea onKeyDown={handleSubmit} onChange={(e) =>  setComment({
                 ...comment,
                  content: e.target.value})}
                   bg="GrayText" placeholder="Write a comment" variant="filled" justifyContent="center" borderRadius="3xl" size="lg"></Textarea>
        </Flex >
    )
}

export default WriteComment;