import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import "react-datepicker/dist/react-datepicker.css";

const BasicEditModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, login, unauthorizedHandler } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState({
    fb_link: user.fb_link,
    linkedin_link: user.linkedin_link,
    git_link: user.git_link,
    phone: user.phone,
    date_of_birth: new Date(user.date_of_birth),
    biography: user.biography,
    nick_name: user.nick_name,
    address: user.address,
  });
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .patch("/api/user/update", editedUser)
      .then((res) => {
        setRequestState("success");
        login({ ...user, ...res.data.user });
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
      <Icon
        float="right"
        onClick={onOpen}
        cursor="pointer"
        fontSize="xl"
        color="green.800"
        opacity="0.6"
        transition="ease 0.3s"
        _hover={{ opacity: 1 }}
        as={FaRegEdit}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="full-name">
                <FormLabel>Full Name</FormLabel>
                <Input type="text" value={user.name} disabled />
                <FormHelperText>
                  Please contact admin to change full name
                </FormHelperText>
              </FormControl>

              <FormControl mb={2} id="nickname">
                <FormLabel>Nickname</FormLabel>
                <Input
                  type="text"
                  value={editedUser.nick_name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, nick_name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="biography">
                <FormLabel>Biography</FormLabel>
                <Input
                  type="text"
                  value={editedUser.biography}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, biography: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="phone">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="address">
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, address: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="dob">
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  as={DatePicker}
                  selected={editedUser.date_of_birth}
                  onChange={(date) =>
                    setEditedUser({ ...editedUser, date_of_birth: date })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="fb_link">
                <FormLabel>Fasebook</FormLabel>
                <Input
                  type="text"
                  value={editedUser.fb_link}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, fb_link: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="git_link">
                <FormLabel>GitHub</FormLabel>
                <Input
                  type="text"
                  value={editedUser.git_link}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, git_link: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="linkedin_link">
                <FormLabel>Linked In</FormLabel>
                <Input
                  type="text"
                  value={editedUser.linkedin_link}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      linkedin_link: e.target.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="green" bg="green.500">
                {requestState === "loading" && <Spinner mr={1} />}Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicEditModal;
