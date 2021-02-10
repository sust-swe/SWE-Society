import {
  Button,
  FormControl,
  FormHelperText,
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

const AddMember = ({ committee, setCommittee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [designation, setDesignation] = useState("");
  const [reg_no, setReg_no] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/committee/role", [{ designation, reg_no }])
      .then((res) => {
        setCommittee(res.data);
        onClose();
        toast({
          title: "Member Added!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
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
        setDesignation("");
        setReg_no("");
      });
  };

  return (
    <>
      <Tfoot onClick={onOpen}>
        <Tr>
          <Th
            colSpan={3}
            textAlign="center"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
          >
            Add Member
          </Th>
        </Tr>
      </Tfoot>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Member</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl id="designation">
                <FormLabel>Designation</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setDesignation(e.target.value.toUpperCase())}
                  value={designation}
                />
                <FormHelperText>
                  Please check if there's any typing mistake
                </FormHelperText>
              </FormControl>

              <FormControl id="reg_no" mt={4}>
                <FormLabel>Registration No</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setReg_no(e.target.value.toUpperCase())}
                  value={reg_no}
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

export default AddMember;
