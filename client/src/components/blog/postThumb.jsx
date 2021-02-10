import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SinglePostModal from "./singlePostModal";

const PostThumb = (post) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        backgroundColor="white"
        w="100%"
        borderRadius="md"
        transition="ease-in-out 0.3s"
        boxShadow="md"
        cursor="pointer"
        direction={["column-reverse", "column-reverse", "row", "row"]}
        _hover={{
          boxShadow: "xl",
          textDecoration: "none",
          color: "green.800",
        }}
        my={2}
        onClick={onOpen}
      >
        <Center>
          <Box p={5} title={post.title}>
            <Text fontSize="xl" mb={1}>
              {post.title}
            </Text>
            <Text fontSize="sm" opacity="0.6" mb={2}>
              {post.reg_no} | {new Date(post.createdAt).toDateString()}
            </Text>
            <Text
              color="gray.500"
              isTruncated
              noOfLines={3}
              dangerouslySetInnerHTML={{
                __html: post.content.replaceAll("&lt;", "<"),
              }}
            />
          </Box>
        </Center>
        <Spacer />
        {post.image && (
          <Image
            src={post.image[0]}
            height={["250px", "250px", "100%", "100%"]}
            width={["100%", "100%", "250px", "250px"]}
            objectFit="cover"
            borderBottomRightRadius={["none", "none", "md", "md"]}
            borderTopLeftRadius={["md", "md", "none", "none"]}
            borderTopRightRadius="md"
          />
        )}
      </Flex>
      <SinglePostModal
        post={post}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    </>
  );
};

export default PostThumb;
