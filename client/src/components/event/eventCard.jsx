import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const EventCard = (event) => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/event/" + event.id);
  };
  return (
    <Box
      onClick={handleClick}
      m={3}
      cursor="pointer"
      width="xs"
      borderRadius="md"
      shadow="xl"
      bg="white"
      transition="ease 0.3s"
      _hover={{ boxShadow: "dark-lg" }}
    >
      <Image borderTopRadius="md" src={event.image[0]} width="sm" />
      <Box p={2}>
        <Text color="green.800" margin="2" fontSize="xl" fontWeight="bold">
          {event.title}
        </Text>
        <Text padding={2}>Date: {event.event_date}</Text>
        <Text padding={2} isTruncated noOfLines={3}>
          {event.description}
        </Text>
      </Box>
    </Box>
  );
};

export default EventCard;
