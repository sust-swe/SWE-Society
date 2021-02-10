import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/generic/layout";

const ChangeEmail = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .patch("/api/user/email/change/", { password, token })
      .then((res) => {
        toast({
          title: "Email Updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/profile");
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
      });
  };

  return (
    <Layout>
      <Center minH="75vh">
        <Box p={5} textAlign="center" bg="white" borderRadius="md" shadow="xl">
          <Heading size="md">Change Email</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="token" mt={4}>
              <FormLabel>Reset Token</FormLabel>
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Email Reset Token"
                name="token"
              />
              <FormHelperText>
                Please check your email for reset token.
              </FormHelperText>
            </FormControl>

            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
            </FormControl>

            <Button disabled={loading} type="submit" colorScheme="green" mt={4}>
              {loading && <Spinner mr={3} />}Change Email
            </Button>
          </form>
        </Box>
      </Center>
    </Layout>
  );
};

export default ChangeEmail;
