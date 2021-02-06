import { Box, Center, Heading } from "@chakra-ui/react";
import SingleNotice from "../components/notice/singleNotice";
import Layout from "../components/generic/layout";
const Notice = () => {
    return (
        <Layout >
            <Box minH="75vh" p={3}>
            <Box align="center" justifyContent="center">
                <Heading margin="3" color="red">Notice Board</Heading>
            </Box>
            <Center >
            <Box bg="white" p={2} borderRadius="md" shadow="xl">
            <SingleNotice></SingleNotice>
            {/* <NoticeFullView style={{display:"none"}} ></NoticeFullView> */}
            <SingleNotice></SingleNotice>
            </Box>
            </Center>
            </Box>
        </Layout>

    )
}

export default Notice;