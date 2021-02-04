import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import EducationEditModal from "./educationEditModal";

const EducationEntry = ({ education }) => {
  const edit = useLocation().pathname.startsWith("/profile");

  return (
    <Box m={3}>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Heading size="md">
          {education.institute} {edit && <EducationEditModal {...education} />}
        </Heading>
        {education.location && (
          <Text fontSize="sm" color="gray.600">
            {education.location}
          </Text>
        )}
      </Flex>
      {(education.degree && education.subject && (
        <Text
          fontSize="sm"
          display="inline"
          mr={2}
        >{`${education.degree} on ${education.subject}`}</Text>
      )) ||
        (education.subject && (
          <Text fontSize="sm" display="inline" mr={2}>
            {education.subject}
          </Text>
        ))}
      {education.joining_date && (
        <>
          <Text display="inline">•</Text>
          <Text fontSize="sm" display="inline" ml={2}>
            {new Date(education.joining_date).getFullYear()} -{" "}
            {education.leaving_date
              ? new Date(education.leaving_date).getFullYear()
              : "Present"}
          </Text>
        </>
      )}
      {education.description && (
        <Text borderLeft="2px solid #aaa" px={2} py={1} my={1} color="gray.600">
          {education.description}
        </Text>
      )}
    </Box>
  );
};

export default EducationEntry;
