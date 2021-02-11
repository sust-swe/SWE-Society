import React from "react";
import {
  Box,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";

const SingleFrame = (content) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior] = React.useState("inside");
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();
  const { loggedIn, unauthorizedHandler, user } = useContext(AuthContext);
  const deleteContent = (e) => {
    e.preventDefault();
    setRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete(`/api/gallary/${content.id}`, content)
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
          })
      : setDeleteRequestState("none");
  };

  return (
    <Box
      onClick={onOpen}
      onClose={onClose}
      margin="3"
      width="lg"
      _hover={{ boxShadow: "dark-lg" }}
      cursor="pointer"
    >
      <Img src={content.image} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="4xl"
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {loggedIn &&
              ["admin", "superadmin"].includes(user.credential.role) && (
                <IconButton
                  onClick={deleteContent}
                  icon={<DeleteIcon color="red" />}
                />
              )}
            <Text mt={2} fontFamily="serif" fontSize="lg" fontWeight="bold">
              {content.caption}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Img marginBottom="2" src={content.image} _hover={{}} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SingleFrame;
