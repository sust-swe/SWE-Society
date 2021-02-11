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
import { useParams } from "react-router-dom";

const ViewBeforeApprove = () => {
  const [loadPromise, setLoadPromise] = useState(false);
  const [requestState, setRequestState] = useState("none");
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [deleteRequestState, setDeleteRequestState] = useState("none");

  const toast = useToast();
  const history = useHistory();
  const { unauthorizedHandler, user } = useContext(AuthContext);

  useEffect(() => {
    const loadFirst = async () => {
      axios
        .get(`/api/blogs/false/${id}`)
        .then((res) => {
          setBlog(res.data);
          setLoadPromise(true);
        })
        .catch((err) => {
          unauthorizedHandler(err);
        });
    };

    loadFirst();
  }, [id, loadPromise]);

  return (
    <Flex justifyContent="center">
      <Box
        justifyContent="center"
        padding="5"
        mt="2"
        width="3xl"
        bg="whitesmoke"
      >
        <Flex align="center" direction="row">
          <Avatar margin={1} src="user.png" />

          <Link fontWeight="bold" fontSize="xl">
            {/* {blog.user.name} */}
            Rumi
          </Link>
          <Spacer />

          {(blog.reg_no === user.reg_no ||
            ["admin", "superadmin"].includes(user.credential.role)) && (
            <Menu>
              <MenuButton as={Button} rightIcon={<TriangleDownIcon />} />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
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
      </Box>
    </Flex>
  );
};

export default ViewBeforeApprove;
