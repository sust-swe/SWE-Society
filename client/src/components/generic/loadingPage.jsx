import { Center, Spinner } from "@chakra-ui/react";

const LoadingPage = (props) => {
  return (
    <Center h="75vh" {...props}>
      <Spinner color="green.800" size="xl" thickness="3px" />
    </Center>
  );
};

export default LoadingPage;
