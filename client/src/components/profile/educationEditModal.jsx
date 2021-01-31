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

const EducationEditModal = (education) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { unauthorizedHandler } = useContext(AuthContext);
  const [editedEducation, setEditedEducation] = useState({
    degree: education.degree,
    institute: education.institute,
    joining_date: new Date(education.joining_date),
    leaving_date: education.leaving_date
      ? new Date(education.leaving_date)
      : null,
    description: education.description,
    subject: education.subject,
  });
  const [requestState, setRequestState] = useState("none");
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .patch("/api/education/" + education.id, editedEducation)
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
          .delete("/api/education/" + education.id)
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
          <ModalHeader>Update Education</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl mb={2} id="institute">
                <FormLabel>Institute</FormLabel>
                <Input
                  type="text"
                  value={editedEducation.institute}
                  onChange={(e) =>
                    setEditedEducation({
                      ...editedEducation,
                      institute: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="degree">
                <FormLabel>Degree</FormLabel>
                <Input
                  type="text"
                  value={editedEducation.degree}
                  onChange={(e) =>
                    setEditedEducation({
                      ...editedEducation,
                      degree: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="subject">
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  value={editedEducation.subject}
                  onChange={(e) =>
                    setEditedEducation({
                      ...editedEducation,
                      subject: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={editedEducation.description}
                  onChange={(e) =>
                    setEditedEducation({
                      ...editedEducation,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="joining_date">
                <FormLabel>Joining Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={editedEducation.joining_date}
                  onChange={(date) =>
                    setEditedEducation({
                      ...editedEducation,
                      joining_date: date,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={2} id="leaving_date">
                <FormLabel>Leaving Date</FormLabel>
                <Input
                  as={DatePicker}
                  selected={editedEducation.leaving_date}
                  isClearable
                  minDate={editedEducation.joining_date}
                  placeholderText="Currently Studying"
                  onChange={(date) =>
                    setEditedEducation({
                      ...editedEducation,
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

export default EducationEditModal;
