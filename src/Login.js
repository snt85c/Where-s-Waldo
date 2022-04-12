import GoogleButton from "react-google-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import {

  Stack,
  Button,
  Alert,
  Form,
} from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn, googleSignIn } = useUserAuth();

const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    try{
        await googleSignIn()
        navigate("/home")
    }catch(err){console.log(err.message)}
}

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
    <Stack gap={3} className="col-md-5 mx-auto" style={{border:"1px solid gray", padding:"5px", marginTop:"10px"}}>
      <div className="">Where's Waldo</div>
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
          <Button variant="primary" size="lg" type="Submit" className="btn-xxl">
            Login
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
        <GoogleButton style={{minWidth:"100%"}} onClick={(e)=>handleGoogleSignIn(e)}/>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        dont have an account?
        <Link to="/signup">Sign-up</Link>
      </div>
    </Stack>
  );
}
