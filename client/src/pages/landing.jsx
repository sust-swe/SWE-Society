import React from "react";
import LandingCarousal from "../components/landing/carousal";
import Layout from "../components/generic/layout";
import Marquee from "../components/landing/marquee";
import EventsView from "../components/landing/eventsView";
import NoticeView from "../components/landing/noticeView";

const Landing = () => {
  return (
    <Layout>
      <Marquee />
      <LandingCarousal
        items={[
          {
            title: "Institute of Information and Communication Technology",
            src: "/ce9ba486d360bfc50cb49c0d08f3c516.jpeg",
            desc: "Mara kha!",
          },
          {
            title: "Boshar Jayga",
            src: "/3d443e3c774ef07be7229c9c5b5507cd.jpeg",
            desc: "Pera nai, chill!",
          },
          {
            title: "Central Library",
            src: "/add059a0d8f482b92d6242fe429d075a.jpeg",
            desc: "Porte boy!",
          },
        ]}
      />
      <EventsView />
      <NoticeView />
    </Layout>
  );
};

export default Landing;
