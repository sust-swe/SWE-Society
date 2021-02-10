import { AddIcon } from "@chakra-ui/icons";
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
import { FaRegEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const SkillsEditModal = ({ isFloating }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, login, unauthorizedHandler } = useContext(AuthContext);
  const [skills, setSkills] = useState(user.skills?.join(", "));
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .patch("/api/user/update", {
        skills: skills
          .trim()
          .toLocaleUpperCase()
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill, ind, self) => skill && self.indexOf(skill) === ind),
      })
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
      {isFloating ? (
        <Button mx={1} onClick={onOpen} size="sm" colorScheme="green">
          <AddIcon mr={1} /> Skills
        </Button>
      ) : (
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
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Skills</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="skills">
                <FormLabel>Skills</FormLabel>
                <Input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <FormHelperText>
                  Separate your skills with comma (,)
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={requestState === "loading"}
                type="submit"
                colorScheme="green"
                bg="green.500"
              >
                {requestState === "loading" && <Spinner mr={1} />}Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SkillsEditModal;
