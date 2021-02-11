import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  Box,
  VisuallyHidden,
  Flex,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const EditBatchModal = ({ batch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageInputRef = useRef(null);
  const [fileLoading, setFileLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  console.log(batch);

  const { unauthorizedHandler } = useContext(AuthContext);

  const [image, setImage] = useState(batch.image);
  const [name, setName] = useState(batch.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .patch("/api/batch/" + batch.batch, { name, image })
      .then((res) => {
        onClose();
        history.go(0);
      })
      .catch(unauthorizedHandler)
      .finally(() => {
        setLoading(false);
        setName("");
        setImage("");
      });
  };

  const handleFileInput = (e) => {
    setFileLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append(file.name, file, file.name);

    axios
      .post("/api/imageupload", formData)
      .then((res) => {
        setImage(res.data.image[0]);
        setFileLoading(false);
      })
      .catch((err) => {
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
      <Badge m={1} colorScheme="green" cursor="pointer" onClick={onOpen}>
        Edit
      </Badge>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Batch</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl id="name">
                <FormLabel>Batch Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Batch Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <Box mt={4}>
                <VisuallyHidden>
                  <input
                    ref={imageInputRef}
                    accept=".jpg,.png,.jpeg"
                    type="file"
                    onChange={handleFileInput}
                  />
                </VisuallyHidden>
                {image?.length > 0 && (
                  <>
                    <Flex flexWrap="wrap">
                      <Image
                        w="150px"
                        onClick={() => setImage("")}
                        h="auto"
                        m={1}
                        src={"/" + image}
                        cursor="pointer"
                        border="1px solid #aaa"
                      />
                    </Flex>
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
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button disabled={loading} colorScheme="green" type="submit">
                {loading && <Spinner mr={3} />}Update Batch
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBatchModal;
