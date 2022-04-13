import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Alert, Form, Container } from "react-bootstrap";
import background from "./dec0n4u-61a693f1-a519-4839-952d-4b2a9f365729.png";
import skyBackground from "./11005249.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clientX, setClientX] = useState();
  const [clientY, setClientY] = useState();
  const navigate = useNavigate();
  const { logIn, googleSignIn, signInAnon, GitHubSignIn } = useUserAuth();

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

  const handleGitHubSignIn = async (e) => {
    e.preventDefault();
    try {
      await GitHubSignIn();
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

  function AnonButton() {
    return (
      <Button
        onClick={(e) => handleAnonSignIn(e)}
        variant="secondary"
        size="lg"
      >
        Log in Anonymously
      </Button>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${skyBackground})`,
          position: "absolute",
          zIndex: "-2",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundPosition:"center",
          backgroundPositionX: `${-clientX / 25}px`,
        }}
      ></div>
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
          backgroundPositionX: `${-clientX / 50}px`,
          backgroundPositionY: `${-clientY / 50}px`,
        }}
        onMouseMove={(e) => {
          setClientX(e.clientX);
          setClientY(e.clientY);
        }}
        onTouchMove={(e) => {
          setClientX(e.changedTouches[0].clientX);
          setClientY(e.changedTouches[0].clientY);
        }}
      >
        <h1
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "5rem",
            fontFamily: "AliandoRocky",
            textJustify:"center",
            textAlign:"center"

          }}
        >
          Where's Waldo?
        </h1>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleButton
              type="light"
                style={{ minWidth: "100%" }}
                onClick={(e) => handleGoogleSignIn(e)}
              />
            </div>
            <GithubButton
            type="light"
              style={{ minWidth: "100%" }}
              onClick={(e) => handleGitHubSignIn(e)}
            />
            <AnonButton />
          </div>
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          dont have an account?
          <Link to="/signup">Sign-up</Link>
        </div>
      </Stack>
    </>
  );
}
