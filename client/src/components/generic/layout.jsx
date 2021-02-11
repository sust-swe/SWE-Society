import { Box } from "@chakra-ui/react";
import React from "react";

const Layout = (props) => {
  return (
    <Box bg="gray.100" h="100%" minH="75vh">
      {props.children}
    </Box>
  );
};

export default Layout;
