import React from "react";
import LandingCarousal from "../components/landing/carousal";
import Layout from "../components/generic/layout";
import Marquee from "../components/landing/marquee";
import EventsView from "../components/landing/eventsView";

const Landing = () => {
  return (
    <div>
      <LandingCarousal
        items={[
          {
            title: "Hello World",
            src: "975c737e3d0dcbfbb3bb4691043ae8d3.jpeg",
            desc: "This is hello world",
          },
          {
            title: "Hello World 2",
            src: "bd2e9131b5256c98cf2f6584faaea745.png",
            desc: "This is hello world 2",
          },
          {
            title: "Hello World 3",
            src: "6a95af9e7585b0db14f537c339fe7e5d.jpeg",
            desc: "This is hello world 3",
          },
        ]}
      />
    </div>

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
    </Layout>

  );
};

export default Landing;
