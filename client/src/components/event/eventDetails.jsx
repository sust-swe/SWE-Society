import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react"
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Layout from "../generic/layout"
const EventDetails = () => {
    return (
        <Layout>
            <Flex>
                <Box >
                    <Image src="https://picsum.photos/800" />
                </Box>
                <Box>
                    <Text fontFamily="heading" margin="5" fontSize="4xl" fontWeight="bold">Seminar & Workshop By Cefalo BD Ltd.</Text>
                    <Divider colorScheme="red" />
                    <Icon margin="3" size="5xl" as={IoLocation}></Icon>
                    <Icon margin="3" size="5xl" as={FaCalendarAlt}></Icon>
                </Box>
            </Flex>
        </Layout>
    )
}

export default EventDetails;