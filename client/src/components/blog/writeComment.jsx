import { Avatar, Box, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const WriteComment = (blog) => {
  const { unauthorizedHandler } = useContext(AuthContext);
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState({
    content: "",
    blog_id: blog.id,
  });

  useEffect(() => {}, [comment]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      setRequestState("loading");

      axios
        .post(`/api/comments/`, comment)
        .then((res) => {
          setRequestState("success");
          setComment({ content: "", blog_id: blog.id });
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
    <Flex pb={1} mr="10">
      <Avatar size="md" margin={1} name={user.name} src={user.image} />
      <Textarea
        bg="lightgray"
        value={comment.content}
        onKeyDown={handleSubmit}
        onChange={(e) =>
          setComment({
            ...comment,
            content: e.target.value,
          })
        }
        placeholder="Write a comment"
        variant="filled"
        justifyContent="center"
        borderRadius="3xl"
        size="lg"
      ></Textarea>
    </Flex>
  );
};

export default WriteComment;
