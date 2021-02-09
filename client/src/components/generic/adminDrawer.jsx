import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton,  Stack,  useDisclosure, useToast } from "@chakra-ui/react"
import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import EventAddDrawer from "../event/eventAddDrawer"
import NoticeAddDrawer from "../notice/noticeAddDrawer";
import GallaryAddDrawer from "../gallary/gallarayAddDrawer";


const AdminDrawer = (event) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const { unauthorizedHandler } = useContext(AuthContext);

    const [requestState, setRequestState] = useState("none");
    const toast = useToast();
    const history = useHistory();

    return (
        <>
            <HamburgerIcon  w={8} h={8} onClick={onOpen}/>
            <Drawer
                size="xs"
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
                                    <EventAddDrawer/>
                                </Box>
                                <Box>
                                    <NoticeAddDrawer/>
                                </Box>
                                <Box>
                                    <GallaryAddDrawer/>
                                </Box>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth="1px">
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default AdminDrawer;