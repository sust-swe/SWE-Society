import { Button, Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const ExpandableComponent = ({ data, onDelete }) => {
  const [deleteStatus, setDeleteStatus] = useState("none");
  const [makeAdminStatus, setMakeAdminStatus] = useState("none");
  const { unauthorizedHandler } = useContext(AuthContext);

  const handleDelete = () => {
    if (window.confirm(`Are you sure to delete ${data.name}?`)) {
      setDeleteStatus("loading");
      axios
        .delete("/api/user/" + data.reg_no)
        .then((res) => {
          setDeleteStatus("none");
          onDelete(data.reg_no);
        })
        .catch((err) => unauthorizedHandler(err));
    }
  };

  const handleMakeAdmin = () => {
    setMakeAdminStatus("loading");
    axios
      .patch("/api/user/setadmin", { reg_no: data.reg_no, role: "admin" })
      .then((res) => {
        setMakeAdminStatus("none");
      })
      .catch((err) => unauthorizedHandler(err));
  };

  return (
    <Center p={1} bg="gray.200">
      <Button size="sm" colorScheme="red" m={1} onClick={handleDelete}>
        {deleteStatus === "loading" && <Spinner mr={3} />}Delete User
      </Button>
      <Button size="sm" colorScheme="green" m={1} onClick={handleMakeAdmin}>
        {makeAdminStatus === "loading" && <Spinner mr={3} />}Make Admin
      </Button>
    </Center>
  );
};

export default ExpandableComponent;
