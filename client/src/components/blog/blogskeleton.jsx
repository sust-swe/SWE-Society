import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const BlogSkeleton = () => {
  return (
    <Flex direction="column" height="75vh">
      <Box padding="6" boxShadow="lg" width="3xl" bg="whitesmoke" mt="2">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>

      <Box padding="6" boxShadow="lg" width="3xl" bg="whitesmoke" mt="5">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </Flex>
  );
};

export default BlogSkeleton;
