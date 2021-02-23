import Layout from "../components/generic/layout";
import {
  Box,
  Button,
  Center,
  Input,
  InputRightElement,
  InputGroup,
  Heading,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import ForgotPassword from "../components/signIn/forgotPassword";

const SignIn = (props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [requestState, setRequestState] = useState("not-requested");

  const { loggedIn, login } = useContext(AuthContext);

  const handlePasswordShow = () => setShow(!show);
  let history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    setRequestState("loading");

    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        setRequestState("loaded");
        login(res.data.user);
        history.push("/");
      })
      .catch((err) => {
        setRequestState("error");
      });
  };

  if (loggedIn) return <Redirect to="/" />;
  else
    return (
      <Layout>
        <Center h={["75vh", "85vh"]}>
          <Box
            boxShadow="xl"
            textAlign="center"
            bg="white"
            borderRadius={5}
            p={4}
          >
            <Heading size="md" m={1}>
              Welcome Back
            </Heading>
            <form onSubmit={signIn}>
              <Input
                placeholder="Email"
                type="email"
                m={1}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <InputGroup m={1}>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordShow}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {requestState === "error" && (
                <Text display="block" fontSize="sm" color="tomato">
                  Invalid Credentials
                </Text>
              )}
              <Button
                colorScheme="teal"
                size="sm"
                m={1}
                mb={4}
                disabled={requestState === "loading" ? 1 : 0}
                type="submit"
              >
                {requestState === "loading" && <Spinner mr={3} />}Sign In
              </Button>
            </form>
            <hr style={{ padding: "5px" }} />

            <Text fontSize="xs">
              <ForgotPassword />
              <Link color="teal.500" href="#" m={1}>
                Don't have an account?
              </Link>
            </Text>
          </Box>
        </Center>
      </Layout>
    );
};

export default SignIn;
