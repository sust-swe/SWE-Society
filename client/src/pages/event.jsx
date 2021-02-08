import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import EventCard from '../components/event/eventCard'
import Layout from "../components/generic/layout";
import EventAddDrawer from "../components/event/eventAddDrawer";

const events = [
    {
      id: 1,
      title: "The first event",
      event_date: "12 December, 2020",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
      image: "https://picsum.photos/1000",
    },
    {
      id: 2,
      title: "The second event without image",
      event_date: "13 December, 2020",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
    },
    {
      id: 3,
      title: "The Third event",
      event_date: "14 December, 2020",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
      image: "https://picsum.photos/900",
    },
    {
        id: 4,
        title: "The Third event",
        event_date: "14 December, 2020",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
        image: "https://picsum.photos/800",
      },
    //   {
    //     id: 5,
    //     title: "The Third event",
    //     event_date: "14 December, 2020",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero soluta tempore voluptatem ducimus sit mollitia, repellendus, eaque est ut tenetur iste eum dolores odio dolorem blanditiis exercitationem vitae at autem!",
    //     image: "https://picsum.photos/900",
    //   },
  ];

const Event = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
        return (
            <Layout >
                <Flex  justifyContent="center" align="center" flexWrap="wrap" >
                    {events.map( (event) => (
                        <EventCard {...event} key={event.id} />
                    ))}
                </Flex>
            </Layout>
        )

}

export default Event
