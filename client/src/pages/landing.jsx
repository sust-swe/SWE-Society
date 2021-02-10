import React from "react";
import LandingCarousal from "../components/landing/carousal";

const Landing = () => {
  return (
    <div>
      <LandingCarousal
        items={[
          {
            title: "Hello World",
            src: "99aa6375d112e84bd2d3d78c47c26bf4.jpeg",
            desc: "This is hello world",
          },
          {
            title: "Hello World 2",
            src: "https://picsum.photos/1200/600",
            desc: "This is hello world 2",
          },
          {
            title: "Hello World 3",
            src: "https://picsum.photos/1200/600",
            desc: "This is hello world 3",
          },
        ]}
      />
    </div>
  );
};

export default Landing;
