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
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const GallaryAddDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { unauthorizedHandler } = useContext(AuthContext);
  const [content, setContent] = useState({
    caption: "At first you have to upload the image",
    image: "",
    file: "",
  });

  useEffect(() => {}, [content]);

  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .post("/api/gallary/", content)
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

  const imageUpload = (e) => {
    e.preventDefault();
    setRequestState("loading");

    const formData = new FormData();

    formData.append("myFile", content.file, content.file.name);

    axios
      .post("api/imageupload", formData)
      .then((res) => {
        setRequestState("success");
        setContent({ image: res.data.image[0] });
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
          <Text fontSize="3xl" fontWeight="bold">
            Gallary
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
                Create a new gallary content
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box marginTop="5">
                    <Input
                      type="file"
                      onChange={(e) => {
                        content.file = e.target.files[0];
                      }}
                    ></Input>
                  </Box>
                  <Button onClick={imageUpload} color="blue.500">
                    Upload
                  </Button>

                  <Box>
                    <Image src={content.image} />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Textarea
                      id="desc"
                      value={content.caption}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          caption: e.target.value,
                        })
                      }
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

export default GallaryAddDrawer;
