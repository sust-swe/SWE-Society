import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { BatchContext } from "../../contexts/batchContext";

const SingleBatchView = ({ batch }) => {
  const { selectedBatch, batchLoading, getSelectedBatch } = useContext(
    BatchContext
  );
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getSelectedBatch(batch);
  }, []);

  const batchCard = (user) => (
    <Flex
      w="150px"
      bg="white"
      shadow="xl"
      direction="column"
      borderRadius="md"
      transition="ease 0.3s"
      _hover={{ shadow: "dark-lg" }}
      m={3}
      cursor="pointer"
      onClick={() => history.push(`/user/${user.reg_no}`)}
      key={user.reg_no}
    >
      <Image
        width="100%"
        height="150px"
        objectFit="cover"
        borderTopRadius="md"
        src={user.image ? "/" + user.image : "https://picsum.photos/500"}
      />
      <Box textAlign="center" m={3}>
        <Heading size="md" color="green.800">
          {user.name}
        </Heading>
        <Badge>{user.reg_no}</Badge>
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      {batchLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Box textAlign="center">
            <Heading size="lg" m={2}>
              {selectedBatch.name}
            </Heading>
            <Badge mb={2}>
              Session {selectedBatch.batch} -{" "}
              {parseInt(selectedBatch.batch) + 1}
            </Badge>
          </Box>
          <Flex flexWrap="wrap" justifyContent="center">
            {selectedBatch.users
              ?.sort((a, b) => a.reg_no - b.reg_no)
              .map(batchCard)}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SingleBatchView;
