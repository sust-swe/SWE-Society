import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const SinglePostModal = ({ post, onClose, onOpen, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        {post.image && (
          <Image
            src={post.image}
            width="100%"
            height="400px"
            objectFit="cover"
            borderTopRadius="md"
          />
        )}
        <ModalHeader>{post.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="sm" opacity="0.6" mb={2}>
            {post.author} | {post.date}
          </Text>
          <Text color="gray.700">{post.content}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SinglePostModal;
