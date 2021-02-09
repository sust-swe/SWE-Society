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
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentBox from "./commentBox";
import CommentsView from "./commentsView";

const SinglePostModal = ({ post, onClose, onOpen, isOpen }) => {
  const [comments, setComments] = useState(post.comments);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        {post.image && (
          <Image
            src={post.image[0]}
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
            <Link to={"/user/" + post.reg_no}>{post.reg_no}</Link> |{" "}
            {new Date(post.createdAt).toDateString()}
          </Text>
          <Text
            color="gray.700"
            dangerouslySetInnerHTML={{
              __html: post.content.replaceAll("&lt;", "<"),
            }}
          />
          {post.comments?.length > 0 && <CommentsView comments={comments} />}
          <CommentBox
            postId={post.id}
            comments={comments}
            setComments={setComments}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SinglePostModal;
