import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import Layout from "../components/generic/layout";

const NoticeFullView = () => {
  const { loggedIn, unauthorizedHandler, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [editedNotice, setEditedNotice] = useState({
    title: "",
    description: "",
    attachment: [],
  });
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const [loadPromise, setLoadPromise] = useState(false);
  const key = useParams().id;

  useEffect(() => {
    setLoading(true);
    const loadFirst = async () => {
      axios
        .get(`/api/notice/${key}`)
        .then((res) => {
          setEditedNotice(res.data);
          setLoading(false);
          setLoadPromise(true);
        })
        .catch((err) => {});
    };
    loadFirst();
  }, [key, loadPromise]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("/api/notice/" + editedNotice.id, editedNotice)
      .then((res) => {
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
      });
  };

  return (
    <Layout>
      <Center minH="75vh">
        {loading ? (
          <Spinner />
        ) : (
          <Box bg="white" w="50%" shadow="xl" borderRadius="md" p={5}>
            <Flex>
              <Text fontSize="2xl" fontWeight="bold" textColor="black">
                {editedNotice.title}
              </Text>
              <Spacer />
              {loggedIn &&
                ["admin", "superadmin"].includes(user.credential.role) && (
                  <IconButton
                    onClick={onOpen}
                    onClose={onClose}
                    icon={<EditIcon />}
                  >
                    Edit
                  </IconButton>
                )}
            </Flex>
            <Text fontSize="xl" fontWeight="bold" textColor="black">
              Date : {new Date(editedNotice.createdAt).getUTCDate()}/
              {new Date(editedNotice.createdAt).getUTCMonth() + 1}/
              {new Date(editedNotice.createdAt).getUTCFullYear()}
            </Text>
            <Text marginTop="5" fontSize="lg" textColor="black">
              {editedNotice.description}
            </Text>

            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        value={editedNotice.title}
                        ref={initialRef}
                        onChange={(e) =>
                          setEditedNotice({
                            ...editedNotice,
                            title: e.target.value,
                          })
                        }
                        placeholder="First name"
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Body</FormLabel>
                      <Textarea
                        value={editedNotice.description}
                        onChange={(e) =>
                          setEditedNotice({
                            ...editedNotice,
                            description: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button type="submit" colorScheme="blue" mr={3}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </Box>
        )}
      </Center>
    </Layout>
  );
};

export default NoticeFullView;
