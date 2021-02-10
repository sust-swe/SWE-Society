import { Flex } from "@chakra-ui/react";
import axios from "axios";
import SingleFrame from "../components/gallary/singleFrame";
import { useState, useEffect } from "react";
// import Layout from "../components/generic/layout";

const Gallary = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/gallary")
      .then((res) => {
        setContents(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <Flex minH="75vh" justifyContent="center" align="center" flexWrap="wrap">
      {contents.map((content) => (
        <SingleFrame {...content} key={content.id} />
      ))}
    </Flex>
  );
};

export default Gallary;
