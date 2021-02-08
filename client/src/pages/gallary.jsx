import { Flex } from "@chakra-ui/react";
import SingleFrame from "../components/gallary/singleFrame";
import Layout from "../components/generic/layout";

const Gallary = () => {
    return (
        <Flex minH="75vh" justifyContent="center" align="center" flexWrap="wrap" >
            <SingleFrame />
        </Flex>
    )
}

export default Gallary;