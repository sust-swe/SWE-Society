import React from "react";
import EventCarousal from "./eventCarousal";
import DatePicker from "react-datepicker";

import {
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import Layout from "../generic/layout";
import { useState, useEffect, useContext } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
const axios = require("axios");

const EventDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedEvent, setEditedEvent] = useState({});
  const [loadPromise, setLoadPromise] = useState(false);
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const key = useParams().id;
  const firstField = React.useRef();
  const toast = useToast();
  const history = useHistory();
  const { loggedIn, unauthorizedHandler, user } = useContext(AuthContext);
  useEffect(() => {
    setRequestState("loading");
    const loadFirst = async () => {
      axios
        .get(`/api/event/${key}`)
        .then((res) => {
          setEditedEvent(res.data);
          setLoadPromise(true);
          setRequestState("none");
        })
        .catch((err) => {
          unauthorizedHandler(err);
          setRequestState("error");
        });
    };

    loadFirst();
  }, [key, loadPromise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .patch(`/api/event/${editedEvent.id}`, editedEvent)
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
          .delete(`/api/event/${editedEvent.id}`)
          .then((res) => {
            setRequestState("success");
            onClose();
            history.goBack();
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
            setDeleteRequestState("error");
          })
      : setDeleteRequestState("none");
  };

  return (
    <Layout>
      {requestState === "loading" ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <SimpleGrid columns={2}>
            <Box pd="10" maxH="75vh">
              <Box>
                {loadPromise && <EventCarousal items={editedEvent.image} />}
              </Box>
            </Box>
            <Box maxH="75vh" overflowY="scroll" overflowX="hidden">
              <Flex direction="column" padding="10">
                <Flex>
                  {loggedIn &&
                    ["admin", "superadmin"].includes(user.credential.role) && (
                      <IconButton
                        onClick={onOpen}
                        fontSize="xl"
                        icon={<EditIcon />}
                      />
                    )}
                  {loggedIn &&
                    ["admin", "superadmin"].includes(user.credential.role) && (
                      <IconButton
                        marginLeft={5}
                        onClick={handleDelete}
                        fontSize="xl"
                        icon={<DeleteIcon />}
                      />
                    )}
                </Flex>

                <Text
                  fontFamily="heading"
                  pt={10}
                  fontSize="4xl"
                  fontWeight="bold"
                >
                  {editedEvent.title}
                </Text>

                <Flex direction="row">
                  {editedEvent.location && (
                    <>
                      <Icon marginBottom="5" size="5xl" as={IoLocation}></Icon>
                      <Text marginLeft="2">{editedEvent.location}</Text>
                    </>
                  )}
                </Flex>
                <Flex direction="row">
                  <Icon size="5xl" as={FaCalendarAlt}></Icon>
                  <Text marginLeft="2" width="50%">
                    {new Date(editedEvent.event_date).getUTCDay()}/
                    {new Date(editedEvent.event_date).getUTCMonth()}/
                    {new Date(editedEvent.event_date).getUTCFullYear()}
                  </Text>
                </Flex>
                <Divider />
                <Box marginTop="5">
                  <Text fontFamily="serif">{editedEvent.description}</Text>
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>

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
                    Edit event
                  </DrawerHeader>

                  <DrawerBody>
                    <Stack spacing="24px">
                      <Box>
                        <FormLabel htmlFor="username">Location</FormLabel>
                        <Input
                          id="location"
                          placeholder="Location"
                          value={editedEvent.location}
                          onChange={(e) =>
                            setEditedEvent({
                              ...editedEvent,
                              location: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        <FormLabel htmlFor="username">Title</FormLabel>
                        <Input
                          ref={firstField}
                          id="title"
                          placeholder="Please enter event title"
                          value={editedEvent.title}
                          onChange={(e) =>
                            setEditedEvent({
                              ...editedEvent,
                              title: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        <FormLabel>Event Date</FormLabel>
                        <Input
                          as={DatePicker}
                          isClearable
                          placeholder="Event date"
                          selected={new Date(editedEvent.event_date)}
                          onChange={(date) =>
                            setEditedEvent({
                              ...editedEvent,
                              event_date: date,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        <FormLabel htmlFor="desc">Description</FormLabel>
                        <Textarea
                          id="desc"
                          value={editedEvent.description}
                          onChange={(e) =>
                            setEditedEvent({
                              ...editedEvent,
                              description: e.target.value,
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
      )}
    </Layout>
  );
};

export default EventDetails;
