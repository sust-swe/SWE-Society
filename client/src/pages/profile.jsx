import {
  Box,
  Grid,
  Image,
  Heading,
  Text,
  Badge,
  Stack,
  Icon,
  Center,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import {
  FaBook,
  FaFacebookSquare,
  FaGithubSquare,
  FaLaptopCode,
  FaLinkedin,
} from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AiFillCode } from "react-icons/ai";
import EducationEntry from "../components/profile/educationEntry";
import axios from "axios";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    axios.get("/api/user/me").then((res) => {
      setUser(res.data.user);
      console.log(res.data.user);
      setRequestState("loaded");
    });
  }, []);

  if (requestState === "loading") return <Heading>Loading</Heading>;
  else
    return (
      <Layout>
        <Grid
          templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
          gap={4}
          p={3}
        >
          <Box w="100%" bg="white" borderRadius="md" boxShadow="xl">
            <Image
              src={user.image ? user.image : "https://picsum.photos/500"}
              alt="Profile Pic"
              w="100%"
              borderTopRadius="md"
            />
            <Box p={3}>
              <Heading size="md" color="green.800">
                {user.name} {user.nick_name && <>({user.nick_name})</>}
              </Heading>

              {user.biography && (
                <Text display="block" fontSize="sm" py={1}>
                  {user.biography}
                </Text>
              )}

              <Stack direction="row" my={2}>
                <Badge colorScheme="green" variant="outline">
                  {user.credential.role}
                </Badge>
                <Badge colorScheme="green" variant="outline">
                  {user.batch}
                </Badge>
                <Badge colorScheme="green" variant="outline">
                  {user.isStudent ? "Student" : "Alumni"}
                </Badge>
              </Stack>

              <Box my={2}>
                {user.credential.email && (
                  <Link
                    href={`mailto:${user.credential.email}`}
                    display="block"
                    my={1}
                  >
                    <Icon as={IoMailOutline} mr={2} fontSize="xl" />
                    {user.credential.email}
                  </Link>
                )}
                {user.phone && (
                  <Link href={`tel:${user.phone}`} display="block" my={1}>
                    <Icon as={FiPhoneCall} mr={2} fontSize="xl" />
                    {user.phone}
                  </Link>
                )}
                {user.address && (
                  <Link display="block" my={1}>
                    <Icon as={GoLocation} mr={2} fontSize="xl" />
                    {user.address}
                  </Link>
                )}
              </Box>

              <Center>
                <Text fontSize="3xl">
                  {user.fb_link && (
                    <Link href={user.fb_link}>
                      <Icon as={FaFacebookSquare} m={1} color="blue.700" />
                    </Link>
                  )}
                  {user.git_link && (
                    <Link href={user.git_link}>
                      <Icon as={FaGithubSquare} m={1} color="black" />
                    </Link>
                  )}
                  {user.linkedin_link && (
                    <Link href={user.linkedin_link}>
                      <Icon as={FaLinkedin} m={1} color="blue.500" />
                    </Link>
                  )}
                </Text>
              </Center>
            </Box>
          </Box>

          <Box>
            <Box
              w="100%"
              bg="white"
              borderRadius="md"
              boxShadow="xl"
              p={3}
              mb={4}
            >
              <Heading size="md" color="teal.800">
                <Icon as={AiFillCode} mr={2} />
                Skills
              </Heading>

              {user.skills.length > 0 && (
                <Stack direction="row" my={2}>
                  {user.skills.map((skill) => (
                    <Badge
                      key={skill}
                      colorScheme="green"
                      variant="solid"
                      p={1}
                    >
                      {skill}
                    </Badge>
                  ))}
                </Stack>
              )}
            </Box>

            {user.education.length > 0 && (
              <Box
                w="100%"
                bg="white"
                borderRadius="md"
                boxShadow="xl"
                p={3}
                mb={4}
              >
                <Heading size="md" color="teal.800">
                  <Icon as={FaBook} mr={2} />
                  Education
                </Heading>

                {user.education.map((edu) => (
                  <EducationEntry key={edu.institute} {...edu} />
                ))}
              </Box>
            )}
            <Box w="100%" bg="white" borderRadius="md" boxShadow="xl" p={3}>
              <Heading size="md" color="teal.800">
                <Icon as={FaLaptopCode} mr={2} />
                Work Experience
              </Heading>
            </Box>
          </Box>
        </Grid>
      </Layout>
    );
};

export default Profile;
