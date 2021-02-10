import BatchList from "../components/batch/batchList";
import Layout from "../components/generic/layout";
import { BatchProvider } from "../contexts/batchContext";

const Batch = (props) => {
  return (
    <BatchProvider>
      <Layout>
        <BatchList />
      </Layout>
    </BatchProvider>
  );
};

export default Batch;
