import {
  Button,
  FormControl,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkEditModal = (work) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { unauthorizedHandler } = useContext(AuthContext);
  const [editedWork, setEditedWork] = useState({
    company: work.company,
    position: work.position,
    location: work.location,
    joining_date: new Date(work.joining_date),
    leaving_date: work.leaving_date ? new Date(work.leaving_date) : null,
    description: work.description,
  });
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setRequestState("loading");
    axios
      .patch("/api/workexp/" + work.id, editedWork)
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

  const deleteItem = () => {
    setDeleteRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete("/api/workexp/" + work.id)
          .then((res) => {
            setDeleteRequestState("success");
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
            setDeleteRequestState("error");
          })
      : setDeleteRequestState("none");
  };

  return (
    <>
      <Icon
        ml={2}
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
          <ModalHeader>Update work</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="company">
                <FormLabel>Company</FormLabel>
                <Input
                  type="text"
                  value={editedWork.company}
                  onChange={(e) =>
                    setEditedWork({
                      ...editedWork,
                      company: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="position">
                <FormLabel>Position</FormLabel>
                <Input
                  type="text"
                  value={editedWork.position}
                  onChange={(e) =>
                    setEditedWork({
                      ...editedWork,
                      position: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="location">
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  value={editedWork.location}
                  onChange={(e) =>
                    setEditedWork({
                      ...editedWork,
                      location: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={editedWork.description}
                  onChange={(e) =>
                    setEditedWork({
                      ...editedWork,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="joining_date">
                <FormLabel>Joining Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={editedWork.joining_date}
                  onChange={(date) =>
                    setEditedWork({
                      ...editedWork,
                      joining_date: date,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="leaving_date">
                <FormLabel>Leaving Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={editedWork.leaving_date}
                  isClearable
                  minDate={editedWork.joining_date}
                  maxDate={new Date()}
                  placeholderText="Currently Working Here"
                  onChange={(date) =>
                    setEditedWork({
                      ...editedWork,
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
              <Button colorScheme="red" mr={3} onClick={deleteItem}>
                {deleteRequestState === "loading" && <Spinner mr={1} />}Delete
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

export default WorkEditModal;
