import { Icon } from "@chakra-ui/icons";
import { Box, Center, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaYoutubeSquare,
  FaGithubSquare,
} from "react-icons/fa";

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
              SWE Society,SUST is a nonpolitical departmental organization for
              the welfare of it's members. The organization was established in
              15 November, 2016.
            </Text>
          </Box>
          <Spacer />
          <Box p={3} m={2} minW={200}>
            <Text fontSize="md">We are available on:</Text>
            <HStack fontSize="4xl">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/swesocietysust/"
              >
                <Icon
                  as={FaFacebookSquare}
                  transition="ease 0.3s"
                  color="blue.500"
                  _hover={{ color: "blue.700" }}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/channel/UC_Yl0PkhLDe17-LWUHOaCUA"
              >
                <Icon
                  as={FaYoutubeSquare}
                  transition="ease 0.3s"
                  color="red.500"
                  _hover={{ color: "red.700" }}
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/sust-swe"
              >
                <Icon
                  as={FaGithubSquare}
                  transition="ease 0.3s"
                  color="white"
                  _hover={{ color: "gray.400" }}
                />
              </a>
            </HStack>
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
