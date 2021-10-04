import { Box, Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import SingleNotice from "../components/notice/singleNotice";
import Layout from "../components/generic/layout";
import { useState, useEffect } from "react";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    axios
      .get("/api/notice")
      .then((res) => {
        setNotices(res.data);
        setRequestState("loaded");
      })
      .catch((err) => {});
  }, []);

  return (
    <Layout>
      <Box minH="75vh" p={3}>
        <Box align="center" justifyContent="center">
          <Heading margin="3">Notice Board</Heading>
        </Box>

        <Center>
          {requestState === "loading" && (
            <Stack>
              <Skeleton width="4xl">
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </Stack>
          )}

          <Box bg="white" p={2} borderRadius="md" shadow="xl">
            {notices.map((notice) => (
              <SingleNotice {...notice} key={notice.id} />
            ))}
          </Box>
        </Center>
      </Box>
    </Layout>
  );
};

export default Notice;
