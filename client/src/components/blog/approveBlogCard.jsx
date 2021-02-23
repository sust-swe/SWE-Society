import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ApproveBlogCard = (blog) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();
  const { unauthorizedHandler } = useContext(AuthContext);

  const gotoFullView = (e) => {
    history.push("/approveblog" + blog.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete(`/api/blogs/${blog.id}`)
          .then((res) => {
            setRequestState("success");
            onClose();
            history.go(0);
          })
          .catch((err) => {
            unauthorizedHandler(err);
            onClose();
            toast({
              title: "Something Went Wrong",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setRequestState("error");
          })
      : setDeleteRequestState("none");
  };

  const approvePost = (e) => {
    setRequestState("loading");
    axios
      .patch(`/api/blogs/approve/${blog.id}`)
      .then((res) => {
        setRequestState("success");
        onClose();
        history.go(0);
      })
      .catch((err) => {
        unauthorizedHandler(err);
        onClose();
        toast({
          title: "Something Went Wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setRequestState("error");
      });
  };

  return (
    <Box width="xs" margin={2} maxW="xs" bg="lightgray" p={3}>
      <Image src={blog.image[0]} />
      <Text fontWeight="bold">{blog.title}</Text>
      <Flex justifyContent="center">
        <Button
          onClick={onOpen}
          mr={2}
          mt={2}
          alignSelf="center"
          color="green.500"
        >
          View
        </Button>
        <Button
          onClick={approvePost}
          mr={2}
          mt={2}
          alignSelf="center"
          color="green.500"
        >
          Approve
        </Button>
        <Button
          onClick={handleDelete}
          mr={2}
          colorScheme="red"
          mt={2}
          alignSelf="center"
          color="black"
        >
          Delete
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={blog.image[0]} />
            <Text mt={2}>{blog.title}</Text>
            <Text
              dangerouslySetInnerHTML={{
                __html: blog.content.replaceAll("&lt;", "<"),
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ApproveBlogCard;
