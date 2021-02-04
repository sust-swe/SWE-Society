import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import WorkEditModal from "./workEditModal";

const WorkEntry = ({ work }) => {
  const edit = useLocation().pathname.startsWith("/profile");

  return (
    <Box m={3}>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Heading size="md">
          {work.company} {edit && <WorkEditModal {...work} />}{" "}
        </Heading>
        {work.location && (
          <Text fontSize="sm" color="gray.600">
            {work.location}
          </Text>
        )}
      </Flex>
      {work.position && (
        <Text fontSize="sm" display="inline" mr={2}>
          {work.position}
        </Text>
      )}
      <>
        <Text display="inline">•</Text>
        <Text fontSize="sm" display="inline" ml={2}>
          {new Date(work.joining_date).getFullYear()} -{" "}
          {work.leaving_date
            ? new Date(work.leaving_date).getFullYear()
            : "Present"}
        </Text>
      </>
      {work.description && (
        <Text borderLeft="2px solid #aaa" px={2} py={1} my={1} color="gray.600">
          {work.description}
        </Text>
      )}
    </Box>
  );
};

export default WorkEntry;
