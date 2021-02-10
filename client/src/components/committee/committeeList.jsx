import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { CommitteeContext } from "../../contexts/committeeContext";

const CommitteeList = (props) => {
  const {
    getCommitteeList,
    committeeList,
    listLoading,
    getSelectedCommittee,
    selectedCommittee,
  } = useContext(CommitteeContext);
  useEffect(() => {
    getCommitteeList();
  }, []);

  const singleItem = (committee) => {
    return (
      <Tr
        _hover={{ bg: "gray.100" }}
        cursor="pointer"
        onClick={() => getSelectedCommittee(committee.committee_order)}
        borderLeft={
          selectedCommittee[0]?.committee_order !== committee?.committee_order
            ? "none"
            : "3px solid #000"
        }
        key={committee.committee_order}
      >
        <Td>
          Session {committee.session[0].value} - {committee.session[1].value}
        </Td>
      </Tr>
    );
  };

  return (
    <Box
      bg="white"
      shadow="xl"
      p={3}
      flexGrow="1"
      maxW={["100%", "100%", "350px", "350px"]}
      minW={["100%", "100%", "350px", "350px"]}
      minH="75vh"
    >
      {listLoading ? (
        <Center h="100%">
          <Spinner />
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="xl" textAlign="center">
                Sessions
              </Th>
            </Tr>
          </Thead>
          <Tbody>{committeeList.map(singleItem)}</Tbody>
        </Table>
      )}
    </Box>
  );
};

export default CommitteeList;
