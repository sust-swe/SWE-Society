import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import { useHistory } from "react-router-dom";

const AddPostForm = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const toast = useToast();
  const { unauthorizedHandler } = useContext(AuthContext);
  const imageInputRef = useRef(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      setLoading(true);
      axios
        .post("/api/blogs/", { title, content, image })
        .then((res) => {
          setLoading(false);
          toast({
            title: "Posted",
            description: "Waiting for approval",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          history.push("/blog");
        })
        .catch((err) => {
          unauthorizedHandler(err);
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
    <Box p={10} bg="white">
      <Heading textAlign="center" size="lg">
        Create a Post
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Post title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Content</FormLabel>
          <HtmlEditor
            options={options}
            value={content}
            onChange={(e) => setContent(e)}
            render={({ editor, view }) => (
              <Box border="1px solid #ddd" borderRadius="md" p={1}>
                <MenuBar menu={menu} view={view} />
                {editor}
              </Box>
            )}
          />
        </FormControl>

        <Box mt={2}>
          <VisuallyHidden>
            <input
              ref={imageInputRef}
              multiple
              accept=".jpg,.png,.jpeg"
              type="file"
              style={{ visibility: "hidden" }}
              height={0}
              onChange={handleFileInput}
            />
          </VisuallyHidden>
          {image.length > 0 && (
            <>
              <Flex flexWrap="wrap">
                {image.map((file) => (
                  <Image
                    w="150px"
                    onClick={() =>
                      setImage(image.filter((cur) => cur !== file))
                    }
                    id={file}
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

        <Button mt={3} disabled={loading} colorScheme="green" type="submit">
          {loading && <Spinner mr={3} />}Post
        </Button>
      </form>
    </Box>
  );
};

export default AddPostForm;
