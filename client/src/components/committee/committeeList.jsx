import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { CommitteeContext } from "../../contexts/committeeContext";

const CommitteeList = (props) => {
  const { getCommitteeList, committeeList, listLoading } = useContext(
    CommitteeContext
  );
  useEffect(() => {
    getCommitteeList();
  }, []);

  const singleItem = ({ committee_order }) => (
    <Heading key={committee_order}>{committee_order}</Heading>
  );

  return (
    <Box>
      {listLoading ? (
        <Spinner />
      ) : (
        committeeList.map((item) => singleItem(item))
      )}
    </Box>
  );
};

export default CommitteeList;
