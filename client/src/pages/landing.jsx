import React from "react";
import LandingCarousal from "../components/landing/carousal";
import Layout from "../components/generic/layout";
import Marquee from "../components/landing/marquee";

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
    </Layout>

  );
};

export default Landing;
