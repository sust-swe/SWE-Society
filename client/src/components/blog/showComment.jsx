import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState, useEffect } from "react";
import { ChevronDownIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import { Link } from "react-router-dom";

const BlogComment = (comment) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { unauthorizedHandler, user } = useContext(AuthContext);
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const [editedComment, setEditedComment] = useState(comment);

  const handleUpdate = (e) => {
    setRequestState("loading");

    axios
      .patch(`/api/comments/${comment.id}`, editedComment)
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
        setRequestState("error");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete(`/api/comments/${comment.id}`)
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
    <Flex align="center" direction="row" mr="10">
      <Avatar
        size="md"
        margin={1}
        name="Dan Abrahmov"
        src={comment.user.image}
      />
      <Box borderRadius="xl" padding="2" bg="lightgray" mb={2} mt={1}>
        <Link fontWeight="bold" to={`user/${comment.reg_no}`}>
          {comment.user.name}
        </Link>
        <Text
          dangerouslySetInnerHTML={{
            __html: comment.content.replaceAll("&lt;", "<"),
          }}
          ml={3}
        ></Text>
      </Box>

      {(comment.user.reg_no === user.reg_no ||
        ["admin", "superadmin"].includes(user.credential.role)) && (
        <Menu>
          <MenuButton ml={3} as={Button} rightIcon={<ChevronDownIcon />} />
          <MenuList>
            {comment.user.reg_no === user.reg_no && (
              <MenuItem onClick={onOpen}>Edit</MenuItem>
            )}
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </Menu>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <HtmlEditor
                options={options}
                value={editedComment.content.replaceAll("&lt;", "<")}
                onChange={(e) =>
                  setEditedComment({
                    ...editedComment,
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
            <Button onClick={handleUpdate}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default BlogComment;
