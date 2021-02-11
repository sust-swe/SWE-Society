import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const EventsView = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("/api/event/").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const singleEvent = (event) => (
    <Box
      onClick={() => history.push("/event/" + event.id)}
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
        <Text padding={2} isTruncated>
          {event.description}
        </Text>
      </Box>
    </Box>
  );

  return (
    <Box mt={5} p={2} textAlign="center">
      <Heading
        borderBottom="5px solid"
        borderColor="teal"
        display="inline-block"
        px={4}
        py={2}
        mb={4}
      >
        Events
      </Heading>

      <Flex justifyContent="center" flexWrap="wrap">
        {events
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map(singleEvent)}
      </Flex>

      <Button
        colorScheme="teal"
        _hover={{ color: "white" }}
        as={Link}
        to="/event"
        textAlign="right"
        m={2}
      >
        View More
      </Button>
    </Box>
  );
};

export default EventsView;
