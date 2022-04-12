import { useUserAuth } from "./UserAuthContext";
import Navbar from "./Navbar";
export default function Main() {
  const { user} = useUserAuth();
  return (
    <>
      <Navbar />
      <div>Main</div>
      <div className="d-grid gap-2">
        <br />
        {user && user.email}
      </div>
    </>
  );
}
