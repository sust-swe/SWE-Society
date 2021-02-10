import {
  Box,
  Button,
  Icon,
  Text,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileImage, FaFileImport } from "react-icons/fa";

const ImageUploader = (props) => {
  const { isOpen, onClose, setImage } = props;
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [fileStatus, setFileStatus] = useState("none");

  const onDrop = useCallback((files) => {
    const file = files[0];
    const type = file.type.split("/")[0];
    if (type === "image") {
      const url = URL.createObjectURL(file);
      setFile(files);
      setUrl(url);
      setFileStatus("selected");
    } else {
      setFile(null);
      setUrl("");
      setFileStatus("wrong-type");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleSubmit = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    axios.post("/api/imageupload", bodyFormData).then((res) => {
      setImage(res.data.image[0]);
      onClose();
    });
  };

  return (
    <>
      {props.children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {url && <Image src={url} />}
            <Box {...getRootProps()}>
              <input {...getInputProps()} accept=".jpg,.png,.jpeg" />
              {fileStatus !== "selected" ? (
                <>
                  {isDragActive ? (
                    <Box textAlign="center" color="gray">
                      <Icon as={FaFileImport} m={2} fontSize="6xl" />
                      <Text>Drop the files here...</Text>
                    </Box>
                  ) : (
                    <Box textAlign="center" color="gray">
                      <Icon as={FaFileImage} m={2} fontSize="6xl" />
                      <Text>
                        {fileStatus !== "wrong-type"
                          ? "Drag & drop your image here, or click to select files"
                          : "Please select an Image file"}
                      </Text>
                    </Box>
                  )}
                </>
              ) : (
                <Center w="100%">
                  <Button m={2}>Change</Button>
                </Center>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleSubmit}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageUploader;
