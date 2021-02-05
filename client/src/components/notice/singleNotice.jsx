import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
const SingleNotice = () => {
    return (
        <Box margin="2" width="4xl" display="flex">

            <Flex  spacing={0}>
                <Box>
                <Center minW="20" border="1px" borderColor="black" bg="white">18 </Center>
                <Center minW="20" bg="blue" textColor="white">21 Jan </Center>
                </Box>
                <Center bg="white"marginLeft="5" >
                    <Link to='notice/fullview'>
                        <Text fontFamily="serif"
                            fontSize="xl"
                        >Deadline for paying society fee</Text>
                    </Link>
                </Center>
            </Flex>


        </Box>
    )
}

export default SingleNotice;