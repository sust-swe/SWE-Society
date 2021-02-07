import React, { Component } from 'react'
import { Box, Image, Text } from '@chakra-ui/react'

const EventCard = (event) =>{
        return (
            <Box minH="2xl" maxH="2xl" overflowY="hidden" margin="3" cursor="pointer" width="sm" _hover={{ boxShadow: "dark-lg" }}>
                <Image src={event.image} width="sm"></Image>
                <Text margin="2" fontSize="xl" fontWeight="bold" >{event.title}</Text>
                <Text padding="2" fontFamily="serif">Date: {event.event_date}</Text>
                <Text fontFamily="serif" padding="2" overflowX="hidden">{event.description}...</Text>
            </Box>
        )
}

export default EventCard
