import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NoticeAddDrawer = (notice) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { unauthorizedHandler } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const imageInputRef = useRef(null);

  useEffect(() => {}, [title, description, attachment]);

  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleFileInput = (e) => {
    setFileLoading(true);
    const files = e.target.files;
    const formData = new FormData();

    for (const file of files) formData.append(file.name, file, file.name);

    axios
      .post("/api/imageupload", formData)
      .then((res) => {
        setAttachment([...attachment, ...res.data.image]);
        setFileLoading(false);
      })
      .catch((err) => {
        unauthorizedHandler(err);
        toast({
          title: "Something Went Wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .post("/api/notice/", { title, description, attachment })
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
    <>
      <Flex
        bg="gray"
        align="center"
        cursor="pointer"
        _hover={{ shadow: "dark-lg" }}
        onClick={onOpen}
      >
        <Box marginLeft="5" size="lg">
          <AddIcon w={6} h={6} />
        </Box>
        <Center marginLeft="5">
          <Text fontSize="2xl" fontWeight="bold">
            Notice
          </Text>
        </Center>
      </Flex>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Create a new notice
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box mt={2}>
                    <VisuallyHidden>
                      <input
                        ref={imageInputRef}
                        multiple
                        accept=".jpg,.png,.pdf,.doc"
                        type="file"
                        style={{ visibility: "hidden" }}
                        height={0}
                        onChange={handleFileInput}
                      />
                    </VisuallyHidden>

                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => imageInputRef.current.click()}
                      disabled={fileLoading}
                    >
                      {fileLoading && <Spinner mr={3} />}Add Attachment
                    </Button>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="username">Title</FormLabel>
                    <Input
                      ref={firstField}
                      id="title"
                      placeholder="Please enter event title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </form>
      </Drawer>
    </>
  );
};

export default NoticeAddDrawer;
