import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

const BlogComment = (comment) => {
    return (
        <Flex align="center" direction="row" mr="10">
            <Avatar size="md" margin={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box borderRadius="3xl" padding="2" bg="grey" mb={2} mt={1}>
                <Text>Md.Mehedi Hasan Rumi</Text>
                <Text ml={3} >{comment.content}</Text>
            </Box>
        </Flex> 
    )
}

export default BlogComment;

