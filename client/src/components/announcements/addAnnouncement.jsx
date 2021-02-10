import {
  Button,
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
  Tfoot,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const AddAnnouncement = ({ announcements, setAnnouncements }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/announcement/", { title, deadline: new Date("12/12/2199") })
      .then((res) => {
        setAnnouncements([...announcements, res.data]);
        onClose();
        toast({
          title: "Announeced!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.table(err);
        toast({
          title: "Something went wrong!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .finally(() => {
        setLoading(false);
        setTitle("");
      });
  };

  return (
    <>
      <Tfoot onClick={onOpen}>
        <Tr>
          <Th textAlign="center" _hover={{ bg: "gray.100" }} cursor="pointer">
            Add Announcement
          </Th>
        </Tr>
      </Tfoot>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button disabled={loading} type="submit" colorScheme="green">
                {loading && <Spinner mr={3} />}Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAnnouncement;
