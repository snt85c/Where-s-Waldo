import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useUserAuth } from "../UserAuthContext";



export default function GameoverOverlay({ ui, setUi }) {
  const { user } = useUserAuth();


  return (
    <>
      <div
        style={{
          display: ui.gameOver ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
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
        <h1 style={{ fontWeight: "bolder", letterSpacing: "5px" }}>GAMEOVER</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user.displayName? user.displayName: "Anonymous" } {" "}
          final score:{ui.finalScore}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="light"
            onClick={() => setUi({ ...ui, checkScores: true })}
          >
            Check Top Scores
          </Button>
          <Button
            style={{ display: ui.instruction ? "none" : "inline" }}
            variant="warning"
            onClick={() => setUi({
                gameStart: true,
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
