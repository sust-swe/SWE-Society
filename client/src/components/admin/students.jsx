import { Center, Container, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GoArrowSmallDown } from "react-icons/go";
import { AuthContext } from "../../contexts/authContext";
import ExpandableComponent from "./expandableComponent";

const Students = () => {
  const [users, setUsers] = useState([]);
  const { unauthorizedHandler } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => unauthorizedHandler(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      name: "Batch",
      selector: "batch",
      sortable: true,
    },
    {
      name: "Reg No",
      selector: "reg_no",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
  ];

  const onDelete = (reg_no) => {
    setUsers(users.filter((user) => user.reg_no !== reg_no));
  };

  return (
    <Center width="100%" p={3}>
      <Container size="xl">
        <Heading textAlign="center" mb={2}>
          Students
        </Heading>
        <DataTable
          pagination
          sortIcon={<GoArrowSmallDown />}
          highlightOnHover
          columns={columns}
          data={users}
          expandableRows
          expandableRowsComponent={<ExpandableComponent onDelete={onDelete} />}
          expandOnRowClicked
        />
      </Container>
    </Center>
  );
};

export default Students;
