import { useUserAuth } from "../UserAuthContext";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";


export default function GoogleLoginButton({setError}) {
    const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

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

    return (
      <>
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
      </>
    );
  }