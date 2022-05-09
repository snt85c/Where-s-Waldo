import { Button } from "react-bootstrap";
import { useUserAuth } from "../UserAuthContext";

export default function GameoverOverlay({ ui, setUi, finalScore }) {
  const { user } = useUserAuth();

  return (
    <>
      <div
        style={{
          display: ui.gameOver ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          zIndex:"3",
          top: "50%",
          left: "50%",
          transform: ` translate(-50%, -50%)`,
          width: "600px",
          height: "400px",
          backgroundColor: "#212529",
          borderRadius: "4%",
          border: "3px solid white",
          padding: "2%",
          color: "white",
          textAlign: "center",

        }}
      >
        <div style={{overflow:"auto", maxHeight:"100px"}}>

        <h1 style={{ fontWeight: "bolder", letterSpacing: "5px" }}>GAMEOVER</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
          {user.displayName? user.displayName: "Anonymous" } {" "}
          final score:{finalScore}
        </div>
          </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{ margin:"5px" }}

            variant="light"
            onClick={() => setUi({ ...ui, checkScores: true })}
          >
            Check Top Scores
          </Button>
          <Button
            style={{ display: ui.instruction ? "none" : "inline", margin:"5px" }}
            variant="warning"
            onClick={()=>setUi({
                gameStart: false,
                gameOver: false,
                checkScores: false,
                instruction: false,
                pirateFound: false,
                catFound: false,
                finalScore: 0,
              })}
          >
            Replay
          </Button>
        </div>
      </div>
    </>
  );
}
