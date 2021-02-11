import {
  Box,
  Center,
  Flex,
  IconButton,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
const SingleNotice = (notice) => {
  const { loggedIn, unauthorizedHandler, user } = useContext(AuthContext);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [deleteRequestState, setDeleteRequestState] = useState("none");
  const toast = useToast();
  const history = useHistory();

  const deleteNotice = () => {
    setDeleteRequestState("loading");
    window.confirm("Are you sure?")
      ? axios
          .delete("/api/notice/" + notice.id)
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
    <Box margin="2" display="flex" shadow>
      <Flex width="100%">
        <Box borderColor="black">
          <Center minW="20" border="1px" borderColor="black" bg="white">
            {new Date(notice.createdAt).getUTCDate()}{" "}
          </Center>
          <Center minW="20" bg="blue" textColor="white">
            {months[new Date(notice.createdAt).getUTCMonth()]}{" "}
            {new Date(notice.createdAt).getUTCFullYear()}
          </Center>
        </Box>
        <Flex width="100%" justifyContent="space-between">
          <Center marginLeft="5">
            <Link to={`notice/${notice.id}`}>
              <Text fontFamily="serif" fontSize="xl">
                {notice.title}
              </Text>
            </Link>
          </Center>
          {loggedIn &&
            ["admin", "superadmin"].includes(user.credential.role) && (
              <IconButton
                m={1}
                mx={3}
                onClick={deleteNotice}
                icon={<DeleteIcon />}
                _hover={{ color: "red.600" }}
              />
            )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleNotice;
