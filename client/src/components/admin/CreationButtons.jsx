import { Flex } from "@chakra-ui/react";
import CreateAdmin from "./createAdmin";
import CreateAlumni from "./createAlumni";
import CreateTeacher from "./createTeacher";
import RemoveAdmin from "./removeAdmin";

const CreationButtons = () => {
  return (
    <Flex flexWrap="wrap">
      <CreateAdmin />
      <CreateAlumni />
      <CreateTeacher />
      <RemoveAdmin />
    </Flex>
  );
};

export default CreationButtons;
