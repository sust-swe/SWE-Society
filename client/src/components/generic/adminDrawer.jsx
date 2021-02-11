import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EventAddDrawer from "../event/eventAddDrawer";
import NoticeAddDrawer from "../notice/noticeAddDrawer";
import GallaryAddDrawer from "../gallary/gallarayAddDrawer";
import { useHistory } from "react-router-dom";

const AdminDrawer = (event) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const history = useHistory();

  const gotoApproveBlog = (e) => {
    history.push("/approveblog");
  };

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
                <Box>
                  <Flex
                    bg="gray"
                    align="center"
                    cursor="pointer"
                    _hover={{ shadow: "dark-lg" }}
                    onClick={gotoApproveBlog}
                  >
                    <Box marginLeft="5" size="lg">
                      <AddIcon w={6} h={6} />
                    </Box>
                    <Center marginLeft="5">
                      <Text fontSize="3xl" fontWeight="bold">
                        Approve Blog
                      </Text>
                    </Center>
                  </Flex>
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
