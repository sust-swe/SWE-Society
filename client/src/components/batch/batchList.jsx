import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { BatchContext } from "../../contexts/batchContext";

const BatchList = (props) => {
  const { getBatchList, batchList, listLoading } = useContext(BatchContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getBatchList();
  }, []);

  const batchCard = (batch) => (
    <Flex
      minW="300px"
      bg="white"
      shadow="xl"
      borderRadius="md"
      transition="ease 0.3s"
      _hover={{ shadow: "dark-lg" }}
      m={3}
      cursor="pointer"
      onClick={() => history.push(`/batch/${batch.batch}`)}
      key={batch.batch}
    >
      <Image
        height="120px"
        width="120px"
        objectFit="cover"
        borderLeftRadius="md"
        src={batch.image ? "/" + batch.image : "https://picsum.photos/200"}
      />
      <Center p={3}>
        <Box>
          <Heading size="md" color="green.800" mb={1}>
            {batch.name}
          </Heading>
          <Badge>
            {batch.batch} - {parseInt(batch.batch) + 1}
          </Badge>
        </Box>
      </Center>
    </Flex>
  );

  return (
    <Box p={4}>
      {listLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Box textAlign="center" m={3}>
            <Heading size="lg">Batches of SWE</Heading>
          </Box>
          <Flex flexWrap="wrap" justifyContent="center">
            {batchList?.sort((a, b) => a.batch - b.batch).map(batchCard)}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default BatchList;
