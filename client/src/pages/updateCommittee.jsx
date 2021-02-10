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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddMember from "../components/committee/addMember";
import Layout from "../components/generic/layout";

const UpdateCommittee = () => {
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/committee/current").then((res) => {
      setCommittee(res.data);
      setLoading(false);
    });
  }, []);

  const deleteUser = (reg_no, index) => {
    if (window.confirm("Are you sure?")) {
      var editedCommittee = [...committee];
      editedCommittee[index].deleted = true;
      setCommittee(editedCommittee);

      axios
        .delete("/api/committee/role/" + reg_no)
        .then((res) => {
          setCommittee(
            editedCommittee.filter((item) => item.reg_no !== reg_no)
          );
          toast({
            title: "Member Deleted!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          editedCommittee[index].deleted = false;
          setCommittee(editedCommittee);
          toast({
            title: "Something Went Wrong!",
            description: "Try logging in again",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const singleItem = (
    { designation, reg_no, user: { name }, deleted },
    index
  ) => (
    <Tr
      _hover={{ bg: "red.100", textDecoration: "line-through" }}
      cursor="pointer"
      onClick={() => deleteUser(reg_no, index)}
      key={reg_no}
      opacity={deleted ? 0.5 : 1}
    >
      <Td textAlign="center">{designation.toUpperCase()}</Td>
      <Td textAlign="center">{reg_no}</Td>
      <Td textAlign="center">{name}</Td>
    </Tr>
  );

  return (
    <Layout>
      <Center minH="75vh" w="100%">
        <Box bg="white" shadow="xl" borderRadius="md">
          {loading ? (
            <Spinner />
          ) : (
            <Table variant="simple">
              {committee.length > 0 ? (
                <>
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Designation</Th>
                      <Th textAlign="center">Registration No</Th>
                      <Th textAlign="center">Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{committee.map(singleItem)}</Tbody>
                </>
              ) : (
                <Thead>
                  <Tr>
                    <Th textAlign="center" colSpan={3}>
                      No Member Added
                    </Th>
                  </Tr>
                </Thead>
              )}
              <AddMember {...{ committee, setCommittee }} />
            </Table>
          )}
        </Box>
      </Center>
    </Layout>
  );
};

export default UpdateCommittee;
