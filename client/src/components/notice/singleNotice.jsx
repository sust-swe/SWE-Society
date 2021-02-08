import { Box, Center, Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { Link, useHistory } from 'react-router-dom';
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
const SingleNotice = (notice) => {
  const { unauthorizedHandler } = useContext(AuthContext);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const deleteNotice = () => {
    setDeleteRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
        .delete("/api/announcement/" + notice.id)
        .then((res) => {
          setDeleteRequestState("success");
          history.go(0);
        })
        .catch((err) => {
          unauthorizedHandler(err);
          toast({
            title: "Something Went Wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setDeleteRequestState("error");
        })
      : setDeleteRequestState("none");
  };

  return (
    <Box margin="2" width="4xl" display="flex" shadow>
      <Flex spacing={0}>
        <Box borderColor="black">
          <Center minW="20" border="1px" borderColor="black" bg="white">{new Date(notice.createdAt).getUTCDate()} </Center>
          <Center minW="20" bg="blue" textColor="white">{months[new Date(notice.createdAt).getUTCMonth()]} {new Date(notice.createdAt).getUTCFullYear()}</Center>
        </Box>
        <Center bg="white" marginLeft="5" >
          <Link to={`notice/${notice.id}`}>
            <Text fontFamily="serif"
              fontSize="xl"
            >{notice.title}</Text>
          </Link>
        </Center>

        <IconButton onClick={deleteNotice} icon={<DeleteIcon/>} />

      </Flex>
    </Box>
  )
}

export default SingleNotice;