import React from "react";
import LandingCarousal from "../components/landing/carousal";

const Landing = () => {
  return (
    <div>
      <LandingCarousal
        items={[
          {
            title: "Hello World",
            src: "052f1d7971b8d72fbc075f8fb31046c8.jpeg",
            desc: "This is hello world",
          },
          {
            title: "Hello World 2",
            src: "96813d64a7f2cb6e7ce627347822d9a7.jpeg",
            desc: "This is hello world 2",
          },
          {
            title: "Hello World 3",
            src: "1df4759507b45bfc3eae3cee8b6d18f7.jpeg",
            desc: "This is hello world 3",
          },
        ]}
      />
    </div>
  );
};

export default Landing;
