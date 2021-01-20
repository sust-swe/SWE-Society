import { Badge, Box, Heading, Icon, Stack } from "@chakra-ui/react";
import { AiFillCode } from "react-icons/ai";

const Skills = ({ skills }) => {
  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3} mb={4}>
      <Heading size="md" color="teal.800">
        <Icon as={AiFillCode} mr={2} />
        Skills
      </Heading>

      <Stack direction="row" my={2}>
        {skills.map((skill) => (
          <Badge key={skill} colorScheme="green" variant="solid" p={1}>
            {skill}
          </Badge>
        ))}
      </Stack>
    </Box>
  );
};

export default Skills;
