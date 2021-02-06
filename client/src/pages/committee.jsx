import CommitteeList from "../components/committee/committeeList";
import CommitteeView from "../components/committee/committeeView";
import Layout from "../components/generic/layout";
import { CommitteeProvider } from "../contexts/committeeContext";

const Committee = (props) => {
  return (
    <CommitteeProvider>
      <Layout>
        <CommitteeList />
        <CommitteeView />
      </Layout>
    </CommitteeProvider>
  );
};

export default Committee;
