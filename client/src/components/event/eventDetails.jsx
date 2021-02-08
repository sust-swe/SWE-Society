import React from "react";
import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import Layout from "../generic/layout";
import { useState, useEffect } from "react";
// import axios from "axios";
const axios = require("axios");

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const [loadPromise, setLoadPromise] = useState(false);
  const key = useParams().id;
  console.log(key);

  useEffect(() => {
    const loadFirst = async () => {
      axios
        .get(`/api/event/${key}`)
        .then((res) => {
          console.log("fuck", res.data);
          setEvent(res.data);
          setLoadPromise(true);
        })
        .catch((err) => {
          console.log("fuck too");
          console.log(err);
        });
    };

    // const loadSecond = async () => {
    //     axios
    //         .get(`/api/event/${key}`)
    //         .then((res) => {
    //             console.log('fuck', res.data);
    //             setEvent(res.data);
    //             setLoadPromise(true);
    //         }).catch((err) => {
    //             console.log('fuck too')
    //             console.log(err);
    //         })
    // }

    // if(loadPromise){
    //     loadSecond();
    // }

    loadFirst();
  }, [key, loadPromise]);

  return (
    <Layout>
      <Flex direction={["column", "column", "row", "row"]}>
        <Box p={10}>
          {loadPromise && <Image src={String(event.image[0])} />}
        </Box>
        <Flex direction="column" justifyContent="center">
          <Text
            fontFamily="heading"
            pt={10}
            pl={10}
            fontSize="4xl"
            fontWeight="bold"
          >
            {event.title}
          </Text>
          <Flex direction="row">
            {event.location && (
              <>
                <Icon
                  marginLeft="10"
                  marginBottom="5"
                  size="5xl"
                  as={IoLocation}
                ></Icon>
                <Text marginLeft="2">{event.location}</Text>
              </>
            )}
          </Flex>
          <Flex direction="row">
            <Icon marginLeft="10" size="5xl" as={FaCalendarAlt}></Icon>
            <Text marginLeft="2">
              {new Date(event.event_date).getUTCDay()}/
              {new Date(event.event_date).getUTCMonth()}/
              {new Date(event.event_date).getUTCFullYear()}
            </Text>
          </Flex>
          <Divider marginLeft="10" />
          <Box marginLeft="10" marginTop="5">
            <Text fontFamily="serif" width="2xl">
              {event.description}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default EventDetails;
