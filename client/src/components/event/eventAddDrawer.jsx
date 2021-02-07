import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState, useEffect } from "react";
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

    useEffect(() => {

    },[editedEvent])

    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editedEvent);
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
                <form onSubmit={handleSubmit}>
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth="1px">
                                Create a new event
                            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing="24px">
                                    <Box>
                                        <Input type="file"
                                        onChange={(e) => setEditedEvent({
                                            ...editedEvent,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        })}
                                         />
                                    </Box>

                                    <Box>
                                        <Image src={editedEvent.image} />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="username">Title</FormLabel>
                                        <Input
                                            ref={firstField}
                                            id="title"
                                            placeholder="Please enter event title"
                                            value={editedEvent.title}
                                            onChange={(e) => setEditedEvent({
                                               ...editedEvent,
                                               title: e.target.value
                                           })}
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="desc">Description</FormLabel>
                                        <Textarea
                                         id="desc"
                                         value={editedEvent.description}
                                         onChange={(e) => setEditedEvent({
                                            ...editedEvent,
                                            description: e.target.value
                                        })} 
                                          />
                                    </Box>

                                    <Box>
                                        <FormLabel>Deadline</FormLabel>
                                        <Input
                                            as={DatePicker}
                                            isClearable
                                            placeholder="Event date"
                                            selected={editedEvent.event_date}
                                            onChange={(date) => setEditedEvent({
                                                ...editedEvent,
                                                event_date: date
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
                                <Button type="submit" colorScheme="blue">Submit</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
                </form>
            </Drawer>
        </>
    )
}

export default EventAddDrawer;