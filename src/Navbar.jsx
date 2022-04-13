import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Navbar, Image } from "react-bootstrap";

export default function Nav() {
  const { user, logout } = useUserAuth();


  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar fixed="top" bg="dark" >
        <Navbar.Text style={{color:"white", marginLeft:"2rem"}}>Where's Waldo?</Navbar.Text>
        <Navbar.Collapse className="justify-content-end ">
          <Stack direction="horizontal" gap={3}>
            {user && (
              <Image roundedCircle fluid
                src={user.photoURL}
                alt=""
                style={{ height: "30px", width: "30px", display:user.displayName?"flex":"none" }}
                referrerPolicy="no-referrer"
              />
            )}
            <Button size="sm" onClick={handleLogout} variant="secondary" style={{marginRight:"2rem"}}>
              Log Out
            </Button >
          </Stack >
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
