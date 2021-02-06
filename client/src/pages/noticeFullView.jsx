import { Box, Button, Center, Text } from "@chakra-ui/react"

const NoticeFullView = (notice) => {
    return (
        <Center bg="grey" minH="75vh">
            <Box bg="white" w="50%" p={4} marginTop="5" marginBottom="5"> 
                <Text fontSize="3xl" fontWeight="bold" textColor="red">Notice Board</Text>
                <Text fontSize="2xl" fontWeight="bold" textColor="black" >পদার্থ বিজ্ঞান বিভাগে সহকারী অধ্যাপক পদে শিক্ষক নিয়োগ বিজ্ঞপ্তি</Text>
                <Text fontSize="xl" fontWeight="bold" textColor="black" >Date : 2021/02/01 - 2021/02/18</Text>
                <Text marginTop="5" fontSize="lg" textColor="black" >
                    শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় , সিলেট এর আর্কিটেকচার বিভাগে সহকারী অধ্যাপক পদে ০২(দুই) জন শিক্ষক নিয়োগের লক্ষ্যে বাংলাদেশের প্রকৃত নাগরিকদের কাছ থেকে নির্ধারিত ফরমে দরখাস্থ আহবান করা যাচ্ছে।
                 </Text>
                 <Button marginTop="3" bg="blue.500">View Attachment</Button>
            </Box>
        </Center>
    )
}

export default NoticeFullView;