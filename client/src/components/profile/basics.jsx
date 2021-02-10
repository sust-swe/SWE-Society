import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import BasicEditModal from "./basicEditModal";
import UpdatePassword from "./updatePassword";

const ProfileBasics = ({ user }) => {
  const edit = useLocation().pathname.startsWith("/profile");

  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl">
      <Image
        src={user.image ? user.image : "https://picsum.photos/500"}
        alt="Profile Pic"
        w="100%"
        borderTopRadius="md"
      />
      <Box p={3}>
        <Heading display="inline-block" size="md" color="green.800">
          {user.name} {user.nick_name && <>({user.nick_name})</>}
        </Heading>
        {edit && <BasicEditModal />}

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
            {user.credential.status}
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
        <Center>
          <UpdatePassword />
          <Button size="sm" m={1}>
            Change Email
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default ProfileBasics;
