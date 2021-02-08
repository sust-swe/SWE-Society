import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';

const EventCard = (event) =>{

    const history = useHistory();
    const handleClick = () => {
        history.push('/event/'+event.id);
    }
        return (
            <Box onClick={handleClick} minH="2xl" maxH="2xl" overflowY="hidden" margin="3" cursor="pointer" width="sm" _hover={{ boxShadow: "dark-lg" }}>
                <Image src={event.image[0]} width="sm"></Image>
                <Text margin="2" fontSize="xl" fontWeight="bold" >{event.title}</Text>
                <Text padding="2" fontFamily="serif">Date: {event.event_date}</Text>
                <Text fontFamily="serif" padding="2" overflowX="hidden">{event.description}...</Text>
            </Box>
        )
}

export default EventCard
