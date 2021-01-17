import { Box } from "@chakra-ui/react";
import React from "react";

const Layout = (props) => {
  return (
    <Box bg="gray.50" h="100%">
      {props.children}
    </Box>
  );
};

export default Layout;
