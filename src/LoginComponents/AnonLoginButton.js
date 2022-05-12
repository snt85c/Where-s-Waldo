import { useUserAuth } from "../UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AnonLoginButton({ setError }) {
  const { signInAnon } = useUserAuth();
  const navigate = useNavigate();

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
  return (
    <Button
      onClick={(e) => handleAnonSignIn(e)}
      variant="warning"
      size="lg"
      style={{ fontWeight: "bolder" }}
    >
      Try Me
    </Button>
  );
}
