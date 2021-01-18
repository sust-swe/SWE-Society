import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

const Profile = (props) => {
  const [user, setUser] = useState();
  const [requestState, setRequestState] = useState("loading");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data.user);
        setRequestState("loaded");
        console.log(res.data.user);
      })
      .catch((err) => setRequestState("error"));
  };

  return requestState === "loading" ? (
    <h1>"Loading"</h1>
  ) : (
    <Row>
      <Col md={4} style={{ margin: "20px" }}>
        <Image
          src="https://picsum.photos/1000"
          width="150px"
          height="150px"
          style={{
            objectFit: "cover",
          }}
          roundedCircle
        />
        {/* <h2>{user.name}</h2>
        <p>{user.reg_no}</p> */}
      </Col>
      <Col md={8}></Col>
    </Row>
  );
};

export default Profile;
