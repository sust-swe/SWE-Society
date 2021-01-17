import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const MyNavbar = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { loggedIn, user } = useContext(AuthContext);

  const MenuItems = (props) => (
    <Link
      as={RouterLink}
      mt={{ base: 4, md: 0 }}
      mr={6}
      display="block"
      to={props.to}
    >
      {props.children}
    </Link>
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.8rem"
      bg="gray.800"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          SWE Society
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems to="/profile">Profile</MenuItems>
        <MenuItems to="/404">404</MenuItems>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {!loggedIn && (
          <Button as={RouterLink} to="/signin" bg="transparent" border="1px">
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default MyNavbar;
