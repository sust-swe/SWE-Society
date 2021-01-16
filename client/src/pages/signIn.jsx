import { Col, Row } from "react-bootstrap";
import SignInForm from "../components/signIn/form";

const SignIn = (props) => {
  return (
    <Row>
      <Col sm={0} md={8} style={{ overflowY: "hidden" }}>
        {/* <Image
          src="https://picsum.photos/1000"
          width="100%"
          style={{ boxSizing: "border-box" }}
        /> */}
      </Col>
      <Col sm={12} md={4}>
        <SignInForm />
      </Col>
    </Row>
  );
};

export default SignIn;
