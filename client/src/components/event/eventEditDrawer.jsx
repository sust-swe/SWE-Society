import { AddIcon, EditIcon } from "@chakra-ui/icons";
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
  IconButton,
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

const EventEditDrawer = (editedEvent) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { unauthorizedHandler } = useContext(AuthContext);
  const [setEditedEvent] = useState({});
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Flex cursor="pointer" onClick={onOpen}>
        <IconButton icon={<EditIcon w={10} h={10} />} />
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
              <DrawerHeader borderBottomWidth="1px">Edit event</DrawerHeader>

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
  );
};

export default EventEditDrawer;
