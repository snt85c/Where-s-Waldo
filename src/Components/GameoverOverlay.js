import { Button } from "react-bootstrap";
import { useUserAuth } from "../UserAuthContext";

export default function GameoverOverlay({ ui, setUi, finalScore }) {
  const { user } = useUserAuth();

  return (
    <>
      <div
        style={{
          display: ui.isGameOver ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          zIndex: "3",
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
          <h1 style={{ fontWeight: "bolder", letterSpacing: "5px" }}>
            GAMEOVER
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize:"1.5rem"
            }}
          >
            final score: {finalScore} seconds
          </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{ margin: "5px" }}
            variant="light"
            onClick={() => setUi({ ...ui, isScoresOverlayOpen: true })}
          >
            Check Top Scores
          </Button>
          <Button
            style={{
              display: ui.isInstructionOverlayOpen ? "none" : "inline",
              margin: "5px",
            }}
            variant="warning"
            onClick={() =>
              setUi({
                isGameStart: false,
                isGameOver: false,
                isScoresOverlayOpen: false,
                isInstructionOverlayOpen: false,
                isPirateFound: false,
                isCatFound: false,
                isChameleonFound:false
              })
            }
          >
            Replay
          </Button>
        </div>
      </div>
    </>
  );
}
