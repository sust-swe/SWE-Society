import { Flex } from "@chakra-ui/react";
import React from "react";
import EventCard from "../components/event/eventCard";
import Layout from "../components/generic/layout";
import { useState, useEffect } from "react";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/event")
      .then((res) => {
        console.log(res);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Layout>
      <Flex justifyContent="center" flexWrap="wrap">
        {events.map((event) => (
          <EventCard {...event} key={event.id} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Event;
