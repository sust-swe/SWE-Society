import { Badge, Box, Heading, Icon, Stack } from "@chakra-ui/react";
import { AiFillCode } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import SkillsEditModal from "./skillsEditModal";

const Skills = ({ skills }) => {
  const edit = useLocation().pathname.startsWith("/profile");

  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3} mb={4}>
      {edit && <SkillsEditModal />}
      <Heading size="md" color="teal.800">
        <Icon as={AiFillCode} mr={2} />
        Skills
      </Heading>

      <Stack direction="row" wrap="wrap" my={2}>
        {skills.map((skill) => (
          <Badge key={skill} colorScheme="green" variant="solid" p={1} mb={2}>
            {skill}
          </Badge>
        ))}
      </Stack>
    </Box>
  );
};

export default Skills;
