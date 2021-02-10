import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const UpdatePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword === confirmPassword) {
      axios
        .patch("/api/user/password/update/", {
          oldpassword: oldPassword,
          newpassword: newPassword,
        })
        .then((res) => {
          toast({
            title: "Password Updated!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Wrong Password!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          onClose();
        });
    } else {
      toast({
        title: "Password did not match!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button size="sm" m={1} onClick={onOpen}>
        Change Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input
                  placeholder="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>New Password</FormLabel>
                <Input
                  placeholder="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  placeholder="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={newPassword !== confirmPassword}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button disabled={loading} type="submit" colorScheme="green">
                {loading && <Spinner mr={3} />}Change Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePassword;
