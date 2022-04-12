import Button from "react-bootstrap/Button";
import { useUserAuth } from "./UserAuthContext";
export default function Main() {
  const { user, logout } = useUserAuth();
  const  handleLogout = async ()=> {
    try {
        await logout()
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <div>Main</div>
      <div className="d-grid gap-2">
        <br />
        {user && user.email}
        <Button onClick={handleLogout} variant="primary">
          Log Out
        </Button>
      </div>
    </>
  );
}
