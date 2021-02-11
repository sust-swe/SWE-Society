import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const NoticeView = () => {
  const [notice, setNotice] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("/api/notice/").then((res) => {
      console.log(res.data);
      setNotice(res.data);
    });
  }, []);

  const singleEvent = (singleNotice) => (
    <Box
      onClick={() => history.push("/notice/" + singleNotice.id)}
      m={3}
      cursor="pointer"
      width="xs"
      borderRadius="md"
      shadow="xl"
      bg="white"
      transition="ease 0.3s"
      _hover={{ boxShadow: "dark-lg" }}
    >
      <Center height="100%">
        <Text color="black" margin="2" fontSize="lg">
          {singleNotice.title}
        </Text>
      </Center>
    </Box>
  );

  return (
    <Box mt={5} bg="teal.800" color="white" p={2} textAlign="center">
      <Heading
        borderBottom="5px solid"
        borderColor="white"
        display="inline-block"
        px={4}
        py={2}
        mb={4}
      >
        Notices
      </Heading>

      <Flex justifyContent="center" flexWrap="wrap">
        {notice
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map(singleEvent)}
      </Flex>

      <Button
        colorScheme="whiteAlpha"
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

export default NoticeView;
