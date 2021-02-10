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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ForgotPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { unauthorizedHandler } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/user/password/forgot/", { email })
      .then((res) => {
        toast({
          title: "Check inbox!",
          description: "Email reset token is sent to your email!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/changeemail");
      })
      .catch(unauthorizedHandler);
  };

  return (
    <>
      <Text color="teal.500" cursor="pointer" onClick={onOpen} m={1}>
        Forgot Password?
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button disabled={loading} type="submit" colorScheme="green">
                {loading && <Spinner mr={3} />}Request Token
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassword;
