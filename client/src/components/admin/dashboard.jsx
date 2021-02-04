import { Flex } from "@chakra-ui/react";
import DashboardButtons from "./DashboardButtons";
import ShowData from "./showData";

const Dashboard = () => {
  return (
    <Flex
      direction={["row", "row", "column", "column"]}
      p={4}
      minH="70vh"
      width="100%"
    >
      <ShowData />
      <DashboardButtons />
    </Flex>
  );
};

export default Dashboard;
