import { AddIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import EducationAddModal from "./educationAddModal";
import WorkAddModal from "./workAddModal";
import SkillsEditModal from "./skillsEditModal";

const AddItemPopover = (props) => {
  return (
    <Popover placement="top-end">
      <PopoverTrigger>
        <IconButton
          colorScheme="green"
          aria-label="Add Item"
          position="sticky"
          bottom="15px"
          left="100%"
          m={3}
          fontSize="25px"
          isRound
          icon={<AddIcon />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <EducationAddModal />
            <WorkAddModal />
            <SkillsEditModal isFloating />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default AddItemPopover;
