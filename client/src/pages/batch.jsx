import { useContext } from "react";
import AddBatchModal from "../components/batch/addBatchModal";
import BatchList from "../components/batch/batchList";
import Layout from "../components/generic/layout";
import { AuthContext } from "../contexts/authContext";
import { BatchProvider } from "../contexts/batchContext";

const Batch = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <BatchProvider>
      <Layout>
        <BatchList />
        {["admin", "superadmin"].includes(user.credential.role) && (
          <AddBatchModal />
        )}
      </Layout>
    </BatchProvider>
  );
};

export default Batch;
