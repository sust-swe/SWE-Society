import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../components/generic/layout";

const ResetPassword = () => {
  let { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      setLoading(true);
      axios
        .patch("/api/user/password/reset/" + token, {
          password: newPassword,
        })
        .then((res) => {
          toast({
            title: "Password Updated!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          history.push("/signin");
        })
        .catch((err) => {
          toast({
            title: err?.response?.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
          setNewPassword("");
          setConfirmPassword("");
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
    <Layout>
      <Center minH="75vh">
        <Box p={5} textAlign="center" bg="white" borderRadius="md" shadow="xl">
          <Heading size="md">Reset Password</Heading>
          <form onSubmit={handleSubmit}>
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

            <Button disabled={loading} type="submit" colorScheme="green" mt={4}>
              {loading && <Spinner mr={3} />}Reset Password
            </Button>
          </form>
        </Box>
      </Center>
    </Layout>
  );
};

export default ResetPassword;
