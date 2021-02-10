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
  const url = useLocation().pathname;
  const ownProfile = url.startsWith("/profile");
  let { id } = useParams();
  if (ownProfile) id = "me";
  const [user, setUser] = useState(null);
  const [requestState, setRequestState] = useState("loading");
  const { unauthorizedHandler } = useContext(AuthContext);

  useEffect(() => {
    setRequestState("loading");
    axios
      .get("/api/user/" + id)
      .then((res) => {
        setUser(res.data.user);
        setRequestState("loaded");
      })
      .catch((err) => {
        unauthorizedHandler(err);
        if (err.response?.status === 404) setRequestState("not-found");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (requestState === "loading") return <LoadingSkeleton />;
  else if (requestState === "not-found")
    return (
      <Center h="80vh">
        <Text color="green.800" fontSize="2xl" opacity={0.5}>
          User Not Found
        </Text>
      </Center>
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

          {ownProfile && <AddItemPopover />}
        </Box>
      </Layout>
    );
};

export default Profile;
