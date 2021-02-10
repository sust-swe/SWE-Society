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
import AddAnnouncement from "../components/announcements/addAnnouncement.jsx";
import Layout from "../components/generic/layout";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/announcement/").then((res) => {
      setAnnouncements(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, []);

  const deleteUser = (id, index) => {
    if (window.confirm("Are you sure?")) {
      var editedCommittee = [...announcements];
      editedCommittee[index].deleted = true;
      setAnnouncements(editedCommittee);

      axios
        .delete("/api/announcement/" + id)
        .then((res) => {
          setAnnouncements(editedCommittee.filter((item) => item.id !== id));
          toast({
            title: "Announcement Deleted!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          editedCommittee[index].deleted = false;
          setAnnouncements(editedCommittee);
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

  const singleItem = ({ id, title, deleted }, index) => (
    <Tr
      _hover={{ bg: "red.100", textDecoration: "line-through" }}
      cursor="pointer"
      onClick={() => deleteUser(id, index)}
      key={id}
      opacity={deleted ? 0.5 : 1}
    >
      <Td textAlign="center">{title}</Td>
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
              {announcements.length > 0 ? (
                <>
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Announcements</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{announcements.map(singleItem)}</Tbody>
                </>
              ) : (
                <Thead>
                  <Tr>
                    <Th textAlign="center" colSpan={3}>
                      No Announcements Added
                    </Th>
                  </Tr>
                </Thead>
              )}
              <AddAnnouncement {...{ announcements, setAnnouncements }} />
            </Table>
          )}
        </Box>
      </Center>
    </Layout>
  );
};

export default Announcements;
