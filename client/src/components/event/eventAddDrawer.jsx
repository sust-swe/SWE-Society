import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EventAddDrawer = (event) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const { unauthorizedHandler } = useContext(AuthContext);
    const [editedEvent, setEditedEvent] = useState({
        title: "",
        description: "",
        event_date: new Date(),
        leaving_date: null,
        image: "",

    });

    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setRequestState("loading");

        axios
            .post("/api/event/", editedEvent)
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
            <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
                Event
            </Button>
            <Drawer
                size="md"
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Create a new event
              </DrawerHeader>
                        <form onSubmit={handleSubmit}>

                            <DrawerBody>
                                <Stack spacing="24px">

                                    <Box>
                                        <FormLabel htmlFor="username">Title</FormLabel>
                                        <Input
                                            ref={firstField}
                                            id="title"
                                            placeholder="Please enter a title"
                                        />
                                    </Box>

                                    <Box>

                                        <FormLabel>Event Date</FormLabel>
                                        <Input
                                            as={DatePicker}
                                            selected={editedEvent.event_date}
                                            isClearable
                                            placeholder="Event date"
                                            onChange={(date) =>
                                                setEditedEvent({
                                                    ...editedEvent,
                                                    event_date: date,
                                                })
                                            }
                                        />

                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="url">Image Url</FormLabel>
                                        <Input
                                            type="url"
                                            id="url"
                                            placeholder="Please enter image url"
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="desc">Description</FormLabel>
                                        <Textarea id="desc" />
                                    </Box>
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth="1px">
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Cancel
                            </Button>
                                <Button type="submit" colorScheme="blue">Submit</Button>
                            </DrawerFooter>
                        </form>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default EventAddDrawer;