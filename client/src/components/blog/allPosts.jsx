import { Center, Container, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { BlogContext } from "../../contexts/blogContext";
import PostThumb from "./postThumb";

const AllPosts = () => {
  const { allPosts, getAllPosts, allPostsLoading } = useContext(BlogContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return allPostsLoading ? (
    <Center w="100%" h="75vh">
      <Spinner />
    </Center>
  ) : (
    <Container p={3} maxW="4xl" centerContent minH="70vh">
      {allPosts.map((post) => (
        <PostThumb {...post} key={post.id} />
      ))}
    </Container>
  );
};

export default AllPosts;
