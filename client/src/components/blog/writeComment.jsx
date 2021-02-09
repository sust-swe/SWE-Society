import { Avatar, Box, Flex, Text, Textarea } from "@chakra-ui/react"

const WriteComment = (comment) => {
    return (
        <Flex pb={1} mr="10" >
            <Avatar size="lg" margin={1} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Textarea bg="GrayText" placeholder="Write a comment" variant="filled" justifyContent="center" borderRadius="3xl" size="lg"></Textarea>
        </Flex >
    )
}

export default WriteComment;