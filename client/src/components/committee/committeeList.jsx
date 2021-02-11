import {
  Badge,
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { CommitteeContext } from "../../contexts/committeeContext";

const CommitteeList = (props) => {
  const {
    getCommitteeList,
    committeeList,
    listLoading,
    getSelectedCommittee,
    selectedCommittee,
  } = useContext(CommitteeContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCommitteeList();
  }, []);

  const history = useHistory();

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
          Session {committee.session[0]?.value} - {committee.session[1]?.value}
          <Badge size="xl" colorScheme="green" ml={2}>
            {committee.committee_order}
          </Badge>
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
          <Tbody>
            {committeeList
              .sort((a, b) => b.committee_order - a.committee_order)
              .map(singleItem)}
          </Tbody>
          {["admin", "superadmin"].includes(user.credential.role) && (
            <Tfoot>
              <Tr
                onClick={() => history.push("/committee/create")}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
              >
                <Th textAlign="center">Add New Committee</Th>
              </Tr>
              <Tr
                onClick={() => history.push("/committee/update")}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
              >
                <Th textAlign="center">Update Current Committee</Th>
              </Tr>
            </Tfoot>
          )}
        </Table>
      )}
    </Box>
  );
};

export default CommitteeList;
