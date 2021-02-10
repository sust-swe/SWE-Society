import axios from "axios";
import { AuthContext } from "./authContext";

const { createContext, useState, useContext } = require("react");

const CommitteeContext = createContext();

const CommitteeProvider = (props) => {
  const [selectedCommittee, setSelectedCommittee] = useState([]);
  const [committeeList, setCommitteeList] = useState([]);
  const [committeeLoading, setCommitteeLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);

  const { unauthorizedHandler } = useContext(AuthContext);

  const getCommitteeList = () => {
    setListLoading(true);
    axios
      .get("/api/committee")
      .then((res) => {
        setCommitteeList(res.data);
        setListLoading(false);
      })
      .catch((err) => unauthorizedHandler(err));
  };

  const getSelectedCommittee = (order) => {
    setCommitteeLoading(true);
    axios
      .get("/api/committee/" + order)
      .then((res) => {
        setSelectedCommittee(res.data);
        setCommitteeLoading(false);
      })
      .catch((err) => unauthorizedHandler(err));
  };

  return (
    <CommitteeContext.Provider
      value={{
        selectedCommittee,
        committeeLoading,
        getSelectedCommittee,
        committeeList,
        listLoading,
        getCommitteeList,
      }}
    >
      {props.children}
    </CommitteeContext.Provider>
  );
};

export { CommitteeContext, CommitteeProvider };
