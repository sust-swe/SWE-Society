import { Flex } from "@chakra-ui/react";
import CreationButtons from "./CreationButtons";
import DashboardButtons from "./DashboardButtons";
import ShowData from "./showData";

const Dashboard = () => {
  return (
    <Flex direction="column" p={4} minH="70vh" width="100%">
      <ShowData />
      <DashboardButtons />
      <CreationButtons />
    </Flex>
  );
};

export default Dashboard;
