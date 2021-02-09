import { Box, Heading, Text } from "@chakra-ui/react";

const CommentsView = ({ comments }) => {
  const singleComment = (comment) => (
    <Box pl={2} m={2} key={comment.id}>
      <Text fontSize="sm" opacity={0.75}>
        {comment.reg_no} | {new Date(comment.createdAt).toDateString()}
      </Text>
      <Text>{comment.content}</Text>
    </Box>
  );

  return (
    <Box mt={3}>
      <Heading size="md">Comments</Heading>
      <Box>{comments.map(singleComment)}</Box>
    </Box>
  );
};

export default CommentsView;
