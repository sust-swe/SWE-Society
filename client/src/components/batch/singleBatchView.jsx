import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { BatchContext } from "../../contexts/batchContext";
import EditBatchModal from "./editBatchModal";

const SingleBatchView = ({ batch }) => {
  const { selectedBatch, batchLoading, getSelectedBatch } = useContext(
    BatchContext
  );
  const { user: loggedUser } = useContext(AuthContext);
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
            {selectedBatch.image && (
              <Image
                m="auto"
                w="100px"
                h="100px"
                src={"/" + selectedBatch.image}
                mb={4}
              />
            )}
            <Heading size="lg">{selectedBatch.name}</Heading>
            <Flex justifyContent="center">
              <Badge m={1}>
                Session {selectedBatch.batch} -{" "}
                {parseInt(selectedBatch.batch) + 1}
              </Badge>

              {["admin", "superadmin"].includes(loggedUser.credential.role) && (
                <EditBatchModal batch={selectedBatch} />
              )}
            </Flex>
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
