import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import GithubButton from "react-github-login-button";


export default function GitHubLoginButton({setError}) {
    const { GitHubSignIn} = useUserAuth();
const navigate = useNavigate();
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
  return (
    <>
      <GithubButton
        type="light"
        style={{ minWidth: "100%" }}
        onClick={(e) => handleGitHubSignIn(e)}
      />
    </>
  );
}
