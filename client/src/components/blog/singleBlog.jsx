import {
  ChatIcon,
  ChevronDownIcon,
  DeleteIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Layout from "../generic/layout";
import ShowComment from "./showComment";
import WriteComment from "./writeComment";
import { useContext, useState, useEffect } from "react";
import BlogCarosuel from "./blogCarosuel";
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import { Link } from "react-router-dom";

const SingleBlog = (blog) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const [editedBlog, setEditedBlog] = useState(blog);
  const [comments, setComments] = useState([]);
  const [loadPromise, setLoadPromise] = useState(false);
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const firstField = React.useRef();
  const toast = useToast();
  const history = useHistory();
  const { unauthorizedHandler, user } = useContext(AuthContext);

  const getBlogComments = (e) => {
    setRequestState("loading");

    axios
      .get(`/api/comments/${blog.id}`)
      .then((res) => {
        setRequestState("success");
        setComments(res.data.comments);
        console.log(res.data);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .patch(`/api/blogs/${blog.id}`, editedBlog)
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

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete(`/api/blogs/${blog.id}`)
          .then((res) => {
            setRequestState("success");
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
            setDeleteRequestState("error");
          })
      : setDeleteRequestState("none");
  };

  return (
    <Box padding="5" mt="2" width="3xl" bg="whitesmoke">
      <Flex align="center" direction="row">
        <Avatar margin={1} src={blog.user.image} />

        <Link fontWeight="bold" to={`user/${blog.reg_no}`} fontSize="xl">
          {blog.user.name}
        </Link>
        <Spacer />

        {(blog.reg_no === user.reg_no ||
          ["admin", "superadmin"].includes(user.credential.role)) && (
          <Menu>
            <MenuButton as={Button} rightIcon={<TriangleDownIcon />} />
            <MenuList>
              <MenuItem onClick={onOpen}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Flex direction="column">
        <Text padding="2" fontWeight="bold" fontSize="lg">
          {blog.title}
        </Text>
        <Text ml={2}>
          {new Date(blog.createdAt).getUTCDay()}/
          {new Date(blog.createdAt).getUTCMonth()}/
          {new Date(blog.createdAt).getUTCFullYear()}
        </Text>
      </Flex>

      <Box padding={2}>
        <Text
          color="black"
          dangerouslySetInnerHTML={{
            __html: blog.content.replaceAll("&lt;", "<"),
          }}
        />
      </Box>
      <Box>
        <BlogCarosuel items={blog.image} />
      </Box>
      <Divider mt={2} orientation="horizontal" />

      <Box align="center" mb={2} justifyContent="center" w="100%">
        <IconButton
          onClick={getBlogComments}
          width="100%"
          icon={<ChatIcon w={8} h={8} />}
        />
      </Box>

      <WriteComment {...blog} />

      <Divider mt={1} mb={1} orientation="horizontal" />

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="title"
                value={editedBlog.title}
                onChange={(e) =>
                  setEditedBlog({
                    ...editedBlog,
                    title: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <HtmlEditor
                options={options}
                value={editedBlog.content.replaceAll("&lt;", "<")}
                onChange={(e) =>
                  setEditedBlog({
                    ...editedBlog,
                    content: e,
                  })
                }
                render={({ editor, view }) => (
                  <Box border="1px solid #ddd" borderRadius="md" p={1}>
                    <MenuBar menu={menu} view={view} />
                    {editor}
                  </Box>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {comments.length > 0 &&
        comments.map((comment) => (
          <ShowComment {...comment} key={comment.id} />
        ))}
    </Box>
  );
};

export default SingleBlog;
