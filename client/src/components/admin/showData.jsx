import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ShowData = () => {
  return (
    <Flex flexWrap="wrap">
      <Box
        textAlign="center"
        _hover={{ color: "black", textDecoration: "none" }}
        minW="150px"
        bg="white"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
      >
        <Heading>4</Heading>
        <Text>Batches</Text>
      </Box>

      <Box
        textAlign="center"
        _hover={{ color: "black", textDecoration: "none" }}
        minW="150px"
        bg="white"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
        as={Link}
        to="/admin/students"
      >
        <Heading>180</Heading>
        <Text>Student Members</Text>
      </Box>

      <Box
        textAlign="center"
        _hover={{ color: "black", textDecoration: "none" }}
        minW="150px"
        bg="white"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
      >
        <Heading>30</Heading>
        <Text>Alumni Members</Text>
      </Box>

      <Box
        textAlign="center"
        _hover={{ color: "black", textDecoration: "none" }}
        minW="150px"
        bg="white"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
      >
        <Heading>6</Heading>
        <Text>Teachers</Text>
      </Box>
    </Flex>
  );
};

export default ShowData;
