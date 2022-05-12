import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import { Stack, Button, Form } from "react-bootstrap";
import background from "../img/houseBackground.png";
import SkyBackground from "../Components/SkyBackground";
import AnonLoginButton from "./AnonLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import GitHubLoginButton from "./GitHubLoginButton";
import AlertErrorLogin from "./AlertErrorLogin";
import SignUpButton from "./SignUpButton";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clientCoords, setClientCoords] = useState({ x: "", y: "" });

  const navigate = useNavigate();
  const { logIn, user } = useUserAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

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
        <AlertErrorLogin error={error} />
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
            <GoogleLoginButton setError={setError} />
            <GitHubLoginButton setError={setError} />
            <AnonLoginButton setError={setError} />
          </div>
        </Form>
        <SignUpButton />
      </Stack>
    </>
  );
}
