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
import ImageUploader from "../generic/imageUploader";

const EventAddDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const { unauthorizedHandler } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setEventDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();
  const [image, setImage] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const imageInputRef = useRef(null);

  useEffect(() => {}, [title, description, event_date, image, location]);

  const handleFileInput = (e) => {
    setFileLoading(true);
    const files = e.target.files;
    const formData = new FormData();

    for (const file of files) formData.append(file.name, file, file.name);

    axios
      .post("/api/imageupload", formData)
      .then((res) => {
        setImage([...image, ...res.data.image]);
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
      .post("/api/event", { title, description, event_date, image, location })
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
            Event
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
                Create a new event
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box mt={2}>
                    <VisuallyHidden>
                      <input
                        ref={imageInputRef}
                        multiple
                        accept=".jpg,.png"
                        type="file"
                        style={{ visibility: "hidden" }}
                        height={0}
                        onChange={handleFileInput}
                      />
                    </VisuallyHidden>
                    {image.length > 0 && (
                      <>
                        <Flex flexWrap="wrap">
                          {image.map((file) => (
                            <Image
                              w="150px"
                              onClick={() =>
                                setImage(image.filter((cur) => cur !== file))
                              }
                              id={file}
                              h="auto"
                              m={1}
                              src={file}
                              cursor="pointer"
                              border="1px solid #aaa"
                            />
                          ))}
                        </Flex>
                        <Text fontSize="sm">Click to delete any photo!</Text>
                      </>
                    )}
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => imageInputRef.current.click()}
                      disabled={fileLoading}
                    >
                      {fileLoading && <Spinner mr={3} />}Add Image
                    </Button>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="username">Location</FormLabel>
                    <Input
                      id="location"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
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
                    <FormLabel>Event Date</FormLabel>
                    <Input
                      as={DatePicker}
                      isClearable
                      placeholder="Event date"
                      selected={event_date}
                      onChange={(date) => setEventDate(date)}
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

export default EventAddDrawer;
