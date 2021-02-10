import { useParams } from "react-router-dom";
import Layout from "../components/generic/layout";
import { BatchProvider } from "../contexts/batchContext";
import SingleBatchView from "../components/batch/singleBatchView.jsx";

const SingleBatch = (props) => {
  const { batch } = useParams();

  return (
    <BatchProvider>
      <Layout>
        <SingleBatchView batch={batch} />
      </Layout>
    </BatchProvider>
  );
};

export default SingleBatch;
