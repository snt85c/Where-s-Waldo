import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Navbar, Image } from "react-bootstrap";

export default function Nav() {
  const { user, logout } = useUserAuth();
  console.log(user && user.photoURL);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar bg="dark" className="mr-5">
        <Navbar.Text style={{color:"white"}}>Navbar</Navbar.Text>
        <div>Welcome {user && user.displayName}!</div>
        <Navbar.Collapse className="justify-content-end ">
          <Stack direction="horizontal" gap={3}>
            {user && (
              <Image roundedCircle fluid
                src={user.photoURL}
                alt=""
                style={{ height: "30px", width: "30px" }}
                referrerPolicy="no-referrer"
              />
            )}
            <Button size="sm" onClick={handleLogout} variant="secondary">
              Log Out
            </Button>
          </Stack>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
