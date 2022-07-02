import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function Login() {
  const { getData, urls } = useContext(GlobalContext);
  const [user, setUser] = useState({ email: "", msg: "" });
  const navigate = useNavigate();
  const Login = async e => {
    e.preventDefault();
    await getData(user.email);
    const msg = "You are successfully Logged In.";
    setTimeout(() => {
      navigate("/home");
    }, 3000);
    setUser({ email: "", msg });
  };
  return (
    <Container className="App-header">
      <h3>
        {user.msg}
      </h3>
      <Form onSubmit={Login} style={{ width: "25rem" }}>
        <Form.Group controlId="forEmail">
          <Form.Label style={{ float: "left" }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            value={user.email}
            onChange={e => setUser({ email: e.target.value })}
            required
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="mt-3"
          style={{ float: "right" }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
