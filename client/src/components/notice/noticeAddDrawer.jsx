import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Image, Input, Stack, Text, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react";
import DatePicker from "react-datepicker";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NoticeAddDrawer = (notice) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const { unauthorizedHandler } = useContext(AuthContext);
    const [editedNotice, setEditedNotice] = useState({
        title: "",
        description: "",
        attachment: [],

    });

    useEffect(() => {

    }, [editedNotice])

    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setRequestState("loading");

        axios
            .post("/api/notice/", editedNotice)
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
            <Flex bg="gray" align="center" cursor="pointer" _hover={{ shadow: "dark-lg" }} onClick={onOpen} >
                <Box marginLeft="5" size="lg">
                    <AddIcon w={6} h={6}/>
                </Box>
                <Center marginLeft="5">
                    <Text fontSize="3xl" fontWeight="bold">Notice</Text>
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
                                    <Box marginTop="5">
                                        <Button color="blue.400" >Attachment</Button>
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="username">Title</FormLabel>
                                        <Input
                                            ref={firstField}
                                            id="title"
                                            placeholder="Please enter event title"
                                            value={editedNotice.title}
                                            onChange={(e) => setEditedNotice({
                                                ...editedNotice,
                                                title: e.target.value
                                            })}
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor="desc">Description</FormLabel>
                                        <Textarea
                                            id="desc"
                                            value={editedNotice.description}
                                            onChange={(e) => setEditedNotice({
                                                ...editedNotice,
                                                description: e.target.value
                                            })}
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

export default NoticeAddDrawer;