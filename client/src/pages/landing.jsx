import React from "react";
import LandingCarousal from "../components/landing/carousal";

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
            src: "bf290297ad1b28c26ea44d48b1d44db0.png",
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
  );
};

export default Landing;
