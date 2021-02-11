import axios from "axios";
import { useEffect, useState } from "react";

const Marquee = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("/api/announcement/").then((res) => {
      setAnnouncements(res.data);
    });
  }, []);

  if (announcements.length > 0)
    return (
      <marquee
        width="100%"
        direction="left"
        height="45px"
        style={{
          background: "teal",
          color: "white",
          lineHeight: "45px",
          fontSize: "18px",
          marginBottom: "-10px",
        }}
      >
        •{"\xa0\xa0\xa0"}
        {announcements.map(
          (ann) => ann.title + "\xa0\xa0\xa0\xa0•\xa0\xa0\xa0\xa0"
        )}
      </marquee>
    );
  else return <></>;
};

export default Marquee;
