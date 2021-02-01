import { Box, Heading, Icon } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import EducationEntry from "./educationEntry";

const Education = ({ education }) => {
  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3} mb={4}>
      <Heading size="md" color="teal.800">
        <Icon as={FaBook} mr={2} />
        Education
      </Heading>

      {education.map((edu) => (
        <EducationEntry key={edu.id} education={edu} />
      ))}
    </Box>
  );
};

export default Education;
