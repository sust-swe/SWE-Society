import { Box, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import axios from "axios";
import ProfileBasics from "../components/profile/basics";
import Skills from "../components/profile/skills";
import Education from "../components/profile/education";
import Work from "../components/profile/work";
import LoadingSkeleton from "../components/profile/skeleton";
import { AuthContext } from "../contexts/authContext";
import { useLocation } from "react-router-dom";
import AddItemPopover from "../components/profile/addItemPopover";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [requestState, setRequestState] = useState("loading");
  const { unauthorizedHandler } = useContext(AuthContext);
  const edit = useLocation().pathname.startsWith("/profile");

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
        setRequestState("loaded");
      })
      .catch((err) => unauthorizedHandler(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (requestState === "loading") return <LoadingSkeleton />;
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
              {user.skills.length > 0 && <Skills skills={user.skills} />}
              {user.education.length > 0 && (
                <Education education={user.education} />
              )}
              {user.workExperiences.length > 0 && (
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
