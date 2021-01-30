import { Box, Grid, Skeleton } from "@chakra-ui/react";
import Layout from "../generic/layout";

const LoadingSkeleton = (props) => {
  return (
    <Layout>
      <Grid
        templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
        gap={4}
        p={3}
      >
        <Skeleton w="100%" borderRadius="md" h="85vh" boxShadow="xl" />
        <Box>
          <Skeleton w="100%" borderRadius="md" h="20vh" boxShadow="xl" mb={4} />
          <Skeleton w="100%" borderRadius="md" h="30vh" boxShadow="xl" mb={4} />
          <Skeleton w="100%" borderRadius="md" h="30vh" boxShadow="xl" />
        </Box>
      </Grid>
    </Layout>
  );
};

export default LoadingSkeleton;
