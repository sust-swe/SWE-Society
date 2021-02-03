import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const AddSingleMember = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestStatus, setRequestStatus] = useState("none");
  const [newUser, setNewUser] = useState({
    name: "",
    reg_no: "",
    email: "",
  });

  const { unauthorizedHandler } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    setRequestStatus("loading");
    axios
      .post("/api/user/register/", newUser)
      .then((res) => {
        setRequestStatus("none");
        onClose();
        toast({
          title: "Member Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
        setRequestStatus("error");
      });
  };

  return (
    <>
      <Center
        textAlign="center"
        minW="150px"
        bg="green.600"
        color="white"
        _hover={{ bg: "green.800" }}
        transition="ease 0.3s"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
        onClick={onOpen}
        cursor="pointer"
      >
        <Text fontSize="xl">Add A Member</Text>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A Member</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="name">
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Certificate Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="reg_no">
                <FormLabel>Reg No</FormLabel>
                <Input
                  type="text"
                  placeholder="Registration No"
                  value={newUser.reg_no}
                  onChange={(e) =>
                    setNewUser({ ...newUser, reg_no: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" type="submit">
                {requestStatus === "loading" && <Spinner mr={1} />} Add User
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSingleMember;
