import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
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

const AddBatchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageInputRef = useRef(null);
  const [fileLoading, setFileLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const { unauthorizedHandler } = useContext(AuthContext);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, batch: year, image });

    setLoading(true);
    axios
      .post("/api/batch/", { name, batch: year, image })
      .then((res) => {
        onClose();
        history.go(0);
      })
      .catch(unauthorizedHandler)
      .finally(() => {
        setLoading(false);
        setName("");
        setImage("");
        setYear("");
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
      <IconButton
        colorScheme="green"
        position="sticky"
        bottom="15px"
        left="100%"
        mb={3}
        mr={3}
        fontSize="25px"
        isRound
        onClick={onOpen}
        icon={<AddIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Batch</ModalHeader>
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

              <FormControl id="batch" mt={4}>
                <FormLabel>Batch Year</FormLabel>
                <Input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
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
                {image.length > 0 && (
                  <>
                    <Flex flexWrap="wrap">
                      <Image
                        w="150px"
                        onClick={() => setImage("")}
                        h="auto"
                        m={1}
                        src={image}
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
                {loading && <Spinner mr={3} />}Create Batch
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBatchModal;
