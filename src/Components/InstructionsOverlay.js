import cat from "../img/cat.png";
import pirate from "../img/pirate.png";
import "../App.css";

import { Button } from "react-bootstrap";
export default function InstructionsOverlay({ gameStart, setGameStart, setCheckScores }) {
  return (
    <>
      <div
        style={{
          display: !gameStart ? "flex" : "none",
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
        <div>
          <h3 className="text-bottom" style={{ fontWeight: "bolder" }}>
            Find the characters as fast as you can
          </h3>
          <h6 className="text-bottom">
            Once you click start, move the mouse to pan around the screen,
          </h6>
        </div>
        <div
          className="text-bottom"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div /*style={{ display: "flex", flexDirection: "column" }}*/>
            <img
              width={80}
              height={100}
              alt="pirate"
              src={pirate}
              style={{ border: "white 1px solid", borderRadius: "5%" }}
            />
            <div style={{ color: "gray" }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </div>
          </div>
          <div /*style={{ display: "flex", flexDirection: "column" }}*/>
            <img
              width={80}
              height={100}
              alt="cat"
              src={cat}
              style={{ border: "white 1px solid", borderRadius: "5%" }}
            />
            <div style={{ color: "gray" }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </div>
          </div>
        </div>
        <h6>try to beat the score by being faster than other players</h6>

        <div className="d-grid gap-2 mx-2">
          <Button variant="light" onClick={()=>setCheckScores(true)}>Check Top Scores</Button>
          <Button variant="warning" onClick={() => setGameStart(true)}>
            Start
          </Button>
        </div>
      </div>
    </>
  );
}
