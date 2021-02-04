import {
  Button,
  FormControl,
  FormLabel,
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
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddIcon } from "@chakra-ui/icons";

const WorkAddModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { unauthorizedHandler } = useContext(AuthContext);
  const [newWork, setNewWork] = useState({
    company: "",
    position: "",
    location: "",
    joining_date: new Date(),
    leaving_date: null,
    description: "",
  });
  const [requestState, setRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setRequestState("loading");
    axios
      .post("/api/workexp/", newWork)
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
      <Button mx={1} onClick={onOpen} size="sm" colorScheme="green">
        <AddIcon mr={1} /> Work
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Work Experience</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="company">
                <FormLabel>Company</FormLabel>
                <Input
                  type="text"
                  value={newWork.company}
                  onChange={(e) =>
                    setNewWork({
                      ...newWork,
                      company: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="position">
                <FormLabel>Position</FormLabel>
                <Input
                  type="text"
                  value={newWork.position}
                  onChange={(e) =>
                    setNewWork({
                      ...newWork,
                      position: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="location">
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  value={newWork.location}
                  onChange={(e) =>
                    setNewWork({
                      ...newWork,
                      location: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={newWork.description}
                  onChange={(e) =>
                    setNewWork({
                      ...newWork,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="joining_date">
                <FormLabel>Joining Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={newWork.joining_date}
                  onChange={(date) =>
                    setNewWork({
                      ...newWork,
                      joining_date: date,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="leaving_date">
                <FormLabel>Leaving Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={newWork.leaving_date}
                  isClearable
                  minDate={newWork.joining_date}
                  maxDate={new Date()}
                  placeholderText="Currently Working Here"
                  onChange={(date) =>
                    setNewWork({
                      ...newWork,
                      leaving_date: date,
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
                {requestState === "loading" && <Spinner mr={1} />}Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkAddModal;
