import axios from "axios";
import { AuthContext } from "./authContext";

const { createContext, useState, useContext } = require("react");

const BatchContext = createContext();

const BatchProvider = (props) => {
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [batchLoading, setBatchLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  const { unauthorizedHandler } = useContext(AuthContext);

  const getBatchList = () => {
    setListLoading(true);
    axios
      .get("/api/batch")
      .then((res) => {
        setBatchList(res.data);
        setListLoading(false);
      })
      .catch((err) => unauthorizedHandler(err));
  };

  const getSelectedBatch = (batch) => {
    setBatchLoading(true);
    axios
      .get("/api/batch/" + batch)
      .then((res) => {
        console.log("Batch", res.data);
        setSelectedBatch(res.data);
        setBatchLoading(false);
      })
      .catch((err) => unauthorizedHandler(err));
  };

  return (
    <BatchContext.Provider
      value={{
        selectedBatch,
        batchLoading,
        getSelectedBatch,
        batchList,
        listLoading,
        getBatchList,
        setBatchList,
      }}
    >
      {props.children}
    </BatchContext.Provider>
  );
};

export { BatchContext, BatchProvider };
