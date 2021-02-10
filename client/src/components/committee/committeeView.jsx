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
import { useHistory } from "react-router-dom";
import { CommitteeContext } from "../../contexts/committeeContext";

const CommitteeView = (props) => {
  const {
    selectedCommittee,
    committeeLoading,
    getSelectedCommittee,
  } = useContext(CommitteeContext);
  const history = useHistory();

  useEffect(() => {
    getSelectedCommittee("current");
  }, []);

  const singleItem = ({ designation, reg_no, user: { name } }) => (
    <Tr
      _hover={{ bg: "gray.100" }}
      cursor="pointer"
      onClick={() => history.push(`/user/${reg_no}`)}
      key={reg_no}
    >
      <Td textAlign="center">{designation}</Td>
      <Td textAlign="center">{reg_no}</Td>
      <Td textAlign="center">{name}</Td>
    </Tr>
  );

  return (
    <Box flexGrow="2">
      {committeeLoading ? (
        <Center height="100%">
          <Spinner />
        </Center>
      ) : (
        <Center m={3} bg="white" borderRadius="md" shadow="lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign="center">Designation</Th>
                <Th textAlign="center">Registration No</Th>
                <Th textAlign="center">Name</Th>
              </Tr>
            </Thead>
            <Tbody>{selectedCommittee.map(singleItem)}</Tbody>
          </Table>
        </Center>
      )}
    </Box>
  );
};

export default CommitteeView;

// selectedCommittee.map((item) => singleItem(item));
