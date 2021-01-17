import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";

const Footer = (props) => {
  return (
    <Box w="100%" bg="gray.800" color="gray.50">
      <Center>
        <Flex
          maxW={800}
          direction={["column", "column", "row"]}
          textAlign={["center", "center", "left"]}
          mt={4}
        >
          <Box p={3} m={2}>
            <Text fontSize="lg">SWE Society</Text>
            <Text fontSize="sm">
              The SWE Society, SUST is a organization of SUST SWE. Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Aut eius, ipsam
              vitae temporibus nobis expedita reiciendis!
            </Text>
          </Box>
          <Spacer />
          <Box p={3} m={2} minW={200}>
            <Text fontSize="md">We are available on:</Text>
            <Text fontSize="sm">
              <ul>
                <li>Youtube</li>
                <li>Facebook</li>
              </ul>
            </Text>
          </Box>
        </Flex>
      </Center>

      <br />
      <hr style={{ backgroundColor: "white", margin: "0px 50px 20px 50px" }} />
      <Center px={2} pb={4}>
        <Text fontSize="sm" opacity="50%">
          Made With ❤️ By Team_Wolverine 🔥
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;
