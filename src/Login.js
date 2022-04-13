import GoogleButton from "react-google-button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Alert, Form, Container } from "react-bootstrap";
import background from "./dec0n4u-61a693f1-a519-4839-952d-4b2a9f365729.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [event, setEvent] = useState("");
  const navigate = useNavigate();
  const { logIn, googleSignIn, signInAnon } = useUserAuth();

  const handleAnonSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInAnon();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <>
      <Stack
        gap={3}
        className="col-md-5 mx-auto"
        style={{
          padding: "5px",
          position: "absolute",
          top: "0px",
          zIndex: "-1",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundPositionX: `${event && -event.pageX /50}px`,
          backgroundPositionY: `${event && -event.pageY /50}px`,
        }}
        onMouseMove={(e) => setEvent(e)}
      >
        <div style={{color:"black", fontWeight:"bolder", fontSize:"3rem"}}>Where's Waldo</div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              type="Submit"
              className="btn-xxl"
            >
              Login
            </Button>
            <Button
              onClick={(e) => handleAnonSignIn(e)}
              variant="secondary"
              size="lg"
              className="btn-xxl"
            >
              Log in Anonymously
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleButton
                style={{ minWidth: "100%" }}
                onClick={(e) => handleGoogleSignIn(e)}
              />
            </div>
          </div>
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", color:"black", fontWeight:"bolder"
          }}
        >
          dont have an account?
          <Link to="/signup">Sign-up</Link>
        </div>
      </Stack>
    </>
  );
}
