import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EventAddDrawer from "../event/eventAddDrawer";
import NoticeAddDrawer from "../notice/noticeAddDrawer";
import GallaryAddDrawer from "../gallary/gallarayAddDrawer";

const AdminDrawer = (event) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <HamburgerIcon w={6} h={6} onClick={onOpen} />
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
            <DrawerHeader borderBottomWidth="1px">Admin</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <EventAddDrawer />
                </Box>
                <Box>
                  <NoticeAddDrawer />
                </Box>
                <Box>
                  <GallaryAddDrawer />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px"></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default AdminDrawer;
