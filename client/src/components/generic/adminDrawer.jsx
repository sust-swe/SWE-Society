import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import EventAddDrawer from "../event/eventAddDrawer"

const AdminDrawer = (event) => {
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

    return (
        <>
            <IconButton onClick={ onOpen} color="black" icon={<HamburgerIcon />}></IconButton>
            <Drawer
                size="sm"
                isOpen={isOpen}
                placement="left"
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Admin
              </DrawerHeader>

                        <DrawerBody>
                            <Stack spacing="24px">
                                <Box>
                                    {/* <IconButton icon={<AddIcon>Event</AddIcon>} ></IconButton> */}
                                    <EventAddDrawer></EventAddDrawer>
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
                            <Button colorScheme="blue">Submit</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default AdminDrawer;