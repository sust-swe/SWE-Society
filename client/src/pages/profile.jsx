import { Box, Center, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import axios from "axios";
import ProfileBasics from "../components/profile/basics";
import Skills from "../components/profile/skills";
import Education from "../components/profile/education";
import Work from "../components/profile/work";
import LoadingSkeleton from "../components/profile/skeleton";
import { AuthContext } from "../contexts/authContext";
import { useLocation, useParams } from "react-router-dom";
import AddItemPopover from "../components/profile/addItemPopover";

const Profile = ({ userId }) => {
  let { id } = useParams();
  if (userId === "me") id = "me";
  const [user, setUser] = useState(null);
  const [requestState, setRequestState] = useState("loading");
  const { unauthorizedHandler } = useContext(AuthContext);
  const edit = useLocation().pathname.startsWith("/profile");

  useEffect(() => {
    axios
      .get("/api/user/" + id)
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
        setRequestState("loaded");
      })
      .catch((err) => {
        unauthorizedHandler(err);
        if (err.response?.status === 404) {
          setRequestState("not-found");
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (requestState === "loading") return <LoadingSkeleton />;
  else if (requestState === "not-found")
    return (
      <Layout>
        <Center h="80vh">
          <Text align="center" fontSize="4xl" color="green.800" opacity={0.4}>
            User Not Found
          </Text>
        </Center>
      </Layout>
    );
  else
    return (
      <Layout>
        <Box position="relative" boxSizing="border-box">
          <Grid
            templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
            gap={4}
            p={3}
          >
            <ProfileBasics user={user} />
            <Box>
              {!(
                user.skills?.length ||
                user.education?.length ||
                user.workExperiences?.length
              ) && (
                <Center h="100%">
                  <Text color="green.800" opacity={0.5}>
                    The user did not provide any data
                  </Text>
                </Center>
              )}

              {user.skills?.length > 0 && <Skills skills={user.skills} />}
              {user.education?.length > 0 && (
                <Education education={user.education} />
              )}
              {user.workExperiences?.length > 0 && (
                <Work works={user.workExperiences} />
              )}
            </Box>
          </Grid>

          {edit && <AddItemPopover />}
        </Box>
      </Layout>
    );
};

export default Profile;
