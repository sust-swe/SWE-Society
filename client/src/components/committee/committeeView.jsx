import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { CommitteeContext } from "../../contexts/committeeContext";

const CommitteeView = (props) => {
  const {
    selectedCommittee,
    committeeLoading,
    getSelectedCommittee,
  } = useContext(CommitteeContext);

  useEffect(() => {
    getSelectedCommittee("current");
  }, []);

  const singleItem = ({ designation, reg_no, user: { name } }) => (
    <Heading key={reg_no}>
      {designation} : {reg_no} : {name}
    </Heading>
  );

  return (
    <Box>
      {committeeLoading ? (
        <Spinner />
      ) : (
        selectedCommittee.map((item) => singleItem(item))
      )}
    </Box>
  );
};

export default CommitteeView;
