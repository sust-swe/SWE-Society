import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/generic/layout";

const CreateCommittee = () => {
  const [start, setStart] = useState(new Date().getFullYear());
  const [end, setEnd] = useState(new Date().getFullYear());
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = () => {
    axios
      .post("/api/committee/", {
        session: [[start], [end]],
        start_date: new Date(),
      })
      .then((res) => {
        toast({
          title: "Committee Created!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/committee/update");
      })
      .catch((err) => {
        toast({
          title: "Something Went Wrong!",
          description: "Try logging in again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout>
      <Center minH="75vh" w="100%">
        <Box bg="white" borderRadius="md" shadow="xl" p={5} textAlign="center">
          <Heading size="lg">Create New Committee</Heading>

          <FormControl id="start" mt={4}>
            <FormLabel>Session Start</FormLabel>
            <NumberInput value={start} onChange={setStart} max={end}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="end" mt={4}>
            <FormLabel>Session End</FormLabel>
            <NumberInput value={end} onChange={setEnd} min={start}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button onClick={handleSubmit} mt={4} colorScheme="green">
            Create Committee
          </Button>
        </Box>
      </Center>
    </Layout>
  );
};

export default CreateCommittee;
