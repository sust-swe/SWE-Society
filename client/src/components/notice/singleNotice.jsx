import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
const SingleNotice = (notice) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
        <Box margin="2" width="4xl" display="flex" shadow>
            <Flex  spacing={0}>
                <Box borderColor="black">
                <Center minW="20" border="1px" borderColor="black" bg="white">{new Date(notice.createdAt).getUTCDay()} </Center>
                <Center minW="20" bg="blue" textColor="white">{months[new Date(notice.createdAt).getUTCMonth()]} {new Date(notice.createdAt).getUTCFullYear()}</Center>
                </Box>
                <Center bg="white"marginLeft="5" >
                    <Link  to={{pathname: 'notice/fullview'}}>
                        <Text fontFamily="serif"
                            fontSize="xl"
                        >{notice.title}</Text>
                    </Link>
                </Center>
            </Flex>
        </Box>
    )
}

export default SingleNotice;