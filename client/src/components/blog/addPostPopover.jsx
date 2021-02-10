import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const AddPostPopover = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const toast = useToast();
  const { unauthorizedHandler } = useContext(AuthContext);
  const imageInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      setLoading(true);
      axios
        .post("/api/blogs/", { title, content, image })
        .then((res) => {
          onClose();
          setLoading(false);
          toast({
            title: "Posted",
            description: "Waiting for approval",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          unauthorizedHandler(err);
          onClose();
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Please fill up Title and Content",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFileInput = (e) => {
    setFileLoading(true);
    const files = e.target.files;
    const formData = new FormData();

    for (const file of files) formData.append(file.name, file, file.name);

    axios
      .post("api/imageupload", formData)
      .then((res) => {
        setImage([...image, ...res.data.image]);
        setFileLoading(false);
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
    <>
      <IconButton
        colorScheme="green"
        position="sticky"
        bottom="15px"
        left="100%"
        mb={3}
        mr={3}
        fontSize="25px"
        isRound
        icon={<AddIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Post title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Write your post..."
                  height="50vh"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>

              <Box>
                <input
                  ref={imageInputRef}
                  multiple
                  accept=".jpg,.png,.jpeg"
                  type="file"
                  style={{ visibility: "hidden" }}
                  height={0}
                  onChange={handleFileInput}
                />
                {image.length > 0 && (
                  <>
                    <Flex flexWrap="wrap">
                      {image.map((file) => (
                        <Image
                          w="150px"
                          onClick={() =>
                            setImage(image.filter((cur) => cur !== file))
                          }
                          h="auto"
                          m={1}
                          src={file}
                          cursor="pointer"
                          border="1px solid #aaa"
                        />
                      ))}
                    </Flex>
                    <Text fontSize="sm">Click to delete any photo!</Text>
                  </>
                )}
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => imageInputRef.current.click()}
                  disabled={fileLoading}
                >
                  {fileLoading && <Spinner mr={3} />}Add Image
                </Button>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" type="reset" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button disabled={loading} colorScheme="green" type="submit">
                {loading && <Spinner mr={3} />}Post
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostPopover;
