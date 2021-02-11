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
  Select,
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
  const [designationSelect, setDesignationSelect] = useState("");
  const [reg_no, setReg_no] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/committee/role", [
        {
          designation:
            designationSelect !== "other" ? designationSelect : designation,
          reg_no,
        },
      ])
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

                <Select
                  placeholder="Select option"
                  onChange={(e) => setDesignationSelect(e.target.value)}
                >
                  <option value="president">President</option>
                  <option value="vice president">Vice President</option>
                  <option value="general secretary">General Secretary</option>
                  <option value="assistant general secretary">
                    Assistant General Secretary
                  </option>
                  <option value="other">Other</option>
                </Select>

                {designationSelect === "other" && (
                  <>
                    <Input
                      type="text"
                      mt={4}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Please write the designation..."
                      value={designation}
                    />
                    <FormHelperText>
                      Please check if there's any typing mistake
                    </FormHelperText>
                  </>
                )}
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
