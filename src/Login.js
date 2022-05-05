import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Alert, Form } from "react-bootstrap";
import background from "./img/dec0n4u-61a693f1-a519-4839-952d-4b2a9f365729.png";
import SkyBackground from "./Components/SkyBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clientCoords, setClientCoords] = useState({ x: "", y: "" });

  const navigate = useNavigate();
  const { logIn, googleSignIn, signInAnon, GitHubSignIn, user } = useUserAuth();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleAnonSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInAnon();
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleGitHubSignIn = async (e) => {
    e.preventDefault();
    try {
      await GitHubSignIn();
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 2000);
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
      setTimeout(() => setError(""), 2000);
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
      <SkyBackground X={clientCoords.x / 20} Y={clientCoords.y / 20} />
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
        }}
        onMouseMove={(e) => {
          setClientCoords({ x: e.clientX, y: e.clientY });
        }}
      >
        <h1
          className="title-left"
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "5rem",
            fontFamily: "AliandoRocky",
            textJustify: "center",
            textAlign: "center",
          }}
        >
          Where's Waldo?
        </h1>
        {error && (
          <Alert
            style={{
              position: "absolute",
              top: "100px",
              left: "50vw",
              transform: ` translate(-50%, 0%)`,
              zIndex: "4",
            }}
            className={` ${!error ? "fadeOut" : ""}`}
            variant="danger"
          >
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPassword">
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
