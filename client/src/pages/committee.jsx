import { Flex } from "@chakra-ui/react";
import CommitteeList from "../components/committee/committeeList";
import CommitteeView from "../components/committee/committeeView";
import Layout from "../components/generic/layout";
import { CommitteeProvider } from "../contexts/committeeContext";

const Committee = (props) => {
  return (
    <CommitteeProvider>
      <Layout>
        <Flex direction={["column-reverse", "column-reverse", "row", "row"]}>
          <CommitteeList />
          <CommitteeView />
        </Flex>
      </Layout>
    </CommitteeProvider>
  );
};

export default Committee;
