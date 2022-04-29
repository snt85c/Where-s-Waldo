import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import SkyBackground from "./Components/SkyBackground";
import { Stack, Button, Alert, Form } from "react-bootstrap";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [screenX, setScreenX] = useState();
  const [screenY, setScreenY] = useState();
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  //onClick,  we call signUp from the context, which contains createUserWithEmailAndPassword(auth, email, password), then navigate home, if something goes wrong, catch will set an error on screen
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  document.body.addEventListener("mousemove", (e) => {
    setScreenX(e.screenX );
    setScreenY(e.screenY)
  });

  return (
    <>
      <SkyBackground screenX={screenX / 20} screenY={screenY / 20} />
      <Stack gap={3} className="col-md-5 mx-auto" style={{ padding: "50px" }}>
        <div className="text-xl font-bold antialiased">Sign Up</div>
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
              Sign Up
            </Button>
          </div>
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Already have an account?
          <Link to="/">
            <div style={{ color: "white", fontWeight:"bolder" }}>Sign In</div>
          </Link>
        </div>
      </Stack>
    </>
  );
}
