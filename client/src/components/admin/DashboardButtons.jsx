import { Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddSingleMember from "./addSingleMember";

const DashboardButtons = () => {
  return (
    <Flex flexWrap="wrap">
      <Center
        textAlign="center"
        minW="150px"
        bg="green.600"
        color="white"
        _hover={{ bg: "green.800", color: "white", textDecoration: "none" }}
        transition="ease 0.3s"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
        as={Link}
        to="/admin/adduser"
      >
        <Text fontSize="xl">Add Members (CSV)</Text>
      </Center>

      <AddSingleMember />

      <Center
        textAlign="center"
        minW="150px"
        bg="green.600"
        color="white"
        _hover={{ bg: "green.800", color: "white", textDecoration: "none" }}
        transition="ease 0.3s"
        shadow="xl"
        borderRadius="md"
        flexGrow="1"
        m={3}
        p={3}
        as={Link}
        to="/announcements"
        cursor="pointer"
      >
        <Text fontSize="xl">Announcements</Text>
      </Center>
    </Flex>
  );
};

export default DashboardButtons;
