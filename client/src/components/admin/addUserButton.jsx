import { Button, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const AddUserButton = (row) => {
  const [requestStatus, setRequestStatus] = useState("none");

  const { unauthorizedHandler } = useContext(AuthContext);
  const toast = useToast();

  const addUser = (e) => {
    setRequestStatus("loading");
    axios
      .post("/api/user/register/", row)
      .then((res) => {
        setRequestStatus("Done");
        toast({
          title: "Member Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        unauthorizedHandler(err);
        setRequestStatus("error");
        toast({
          title: "Something Went Wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Button
      variant="solid"
      size="sm"
      colorScheme={requestStatus === "error" ? "red" : "green"}
      disabled={!(requestStatus === "none" || requestStatus === "done")}
      onClick={addUser}
    >
      {requestStatus === "loading" && <Spinner mr={2} />}
      {requestStatus === "error" ? "Error" : "Add"}
    </Button>
  );
};

export default AddUserButton;
