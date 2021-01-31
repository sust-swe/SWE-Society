import { Box, Heading, Icon } from "@chakra-ui/react";
import { FaLaptopCode } from "react-icons/fa";
import WorkEntry from "./workEntry";

const Work = ({ works }) => {
  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3}>
      <Heading size="md" color="teal.800">
        <Icon as={FaLaptopCode} mr={2} />
        Work Experiences
      </Heading>

      {works.map((work) => (
        <WorkEntry key={work.id} work={work} />
      ))}
    </Box>
  );
};

export default Work;
