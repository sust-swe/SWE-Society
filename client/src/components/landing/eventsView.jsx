import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const EventsView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/event/").then((res) => {
      console.log(res.data);
    });
  }, []);

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
      {/* 
      <Flex>

      </Flex> */}
    </Box>
  );
};

export default EventsView;
