import { useUserAuth } from "./UserAuthContext";
import { Stack, Button, Navbar, Image } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Nav({ ui, setUi, setFinalScore }) {
  const { user, logout } = useUserAuth();
  const [time, setTime] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
  };

  function Timer() {
    useEffect(() => {
      let interval;
      if (ui.gameStart) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } 
      if(ui.gameOver){
        clearInterval(interval)
        setFinalScore(time)
      }
      if(!ui.gameStart && !ui.gameOver){
        setTime(0)
      }
      
      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <>
        <div
          style={{ display: ui.gameStart ? "flex" : "none", color: "white" }}
        >
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar fixed="top" bg="dark">
        <Navbar.Text
          style={{
            color: "white",
            marginLeft: "2rem",
            fontSize: "1.5rem",
            fontFamily: "AliandoRocky",
          }}
        >
          Where's Waldo?
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end ">
          <Stack direction="horizontal" gap={3}>
            <Timer />
            <Button
              size="sm"
              onClick={() => setUi({ ...ui, instruction: !ui.instruction })}
              variant="warning"
              style={{
                display: ui.gameStart ? "flex" : "none",
              }}
            >
              INSTRUCTIONS
            </Button>
            {user && (
              <Image
                roundedCircle
                fluid
                src={user.photoURL}
                alt=""
                style={{
                  height: "30px",
                  width: "30px",
                  display: user.photoURL ? "flex" : "none",
                }}
                referrerPolicy="no-referrer"
              />
            )}
            <Button
              size="sm"
              onClick={handleLogout}
              variant="secondary"
              style={{ marginRight: "2rem" }}
            >
              Log Out
            </Button>
          </Stack>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
