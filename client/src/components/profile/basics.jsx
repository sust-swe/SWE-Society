import {
  Badge,
  Box,
  Center,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import BasicEditModal from "./basicEditModal";
import UpdateEmail from "./updateEmail";
import UpdatePassword from "./updatePassword";

const ProfileBasics = ({ user }) => {
  const edit = useLocation().pathname.startsWith("/profile");
  const [fileLoading, setFileLoading] = useState(false);
  const { user: oldUser, login, unauthorizedHandler } = useContext(AuthContext);
  const imageRef = useRef(null);
  const toast = useToast();
  const history = useHistory();

  const handleFileInput = (e) => {
    setFileLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append(file.name, file, file.name);

    axios
      .post("api/imageupload", formData)
      .then((res) => {
        const imageUrl = res.data.image[0];
        return axios.patch("/api/user/update/", { image: imageUrl });
      })
      .then((res) => {
        login({ ...oldUser, ...res.data.user });
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
      });
  };

  return (
    <Box w="100%" bg="white" borderRadius="md" boxShadow="xl">
      {edit && (
        <VisuallyHidden>
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            ref={imageRef}
            onChange={handleFileInput}
          />
        </VisuallyHidden>
      )}
      {fileLoading ? (
        <Center minH="200px">
          <Spinner />
        </Center>
      ) : (
        <Image
          src={user.image ? "/" + user.image : "https://picsum.photos/500"}
          alt="Profile Pic"
          w="100%"
          borderTopRadius="md"
          transition="ease 0.3s"
          cursor={edit ? "pointer" : "auto"}
          onClick={() => {
            if (edit) imageRef.current.click();
          }}
          _hover={{ opacity: edit ? 0.7 : 1 }}
        />
      )}
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
          <Text fontSize="2xl">
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
        {edit && (
          <Center>
            <UpdatePassword />
            <UpdateEmail />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default ProfileBasics;
