import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignInForm = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div style={{ width: "80%", marginX: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Sign In</h3>
      <Form>
        <Form.Group controlId="signInEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="signInPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={signIn}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignInForm;
