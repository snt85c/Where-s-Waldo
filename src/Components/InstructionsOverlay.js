import cat from "../img/cat.png";
import pirate from "../img/pirate.png";
import chameleon from "../img/chameleon.png";
import "../App.css";

import { Button } from "react-bootstrap";
export default function InstructionsOverlay({ setUi, ui }) {
  function CatDescription() {
    return (
      <div>
        <img
          width={80}
          height={100}
          alt="cat"
          src={cat}
          style={{ border: "white 1px solid", borderRadius: "5%" }}
        />
        <div style={{ fontSize: "0.8rem" }}>The Cat</div>
        <div style={{ color: "gray", fontSize: "0.9rem" }}>
          Lazily waiting to be found on some roof in the city
        </div>
      </div>
    );
  }

  function ChameleonDescription() {
    return (
      <div>
        <img
          width={80}
          height={100}
          alt="chameleon"
          src={chameleon}
          style={{ border: "white 1px solid", borderRadius: "5%" }}
        />
        <div style={{ fontSize: "0.8rem" }}>The Chameleon</div>
        <div style={{ color: "gray", fontSize: "0.9rem" }}>
          This evasive little fella won't be easy to find
        </div>
      </div>
    );
  }

  function PirateDescription() {
    return (
      <div>
        <img
          width={80}
          height={100}
          alt="pirate"
          src={pirate}
          style={{ border: "white 1px solid", borderRadius: "5%" }}
        />
        <div style={{ fontSize: "0.8rem" }}>The Pirate</div>
        <div style={{ color: "gray", fontSize: "0.9rem" }}>
          Master of the sea, ready to set sail on his ship
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          display: !ui.gameStart || ui.instruction ? "flex" : "none",
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
          padding: "1%",
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
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <PirateDescription />
          <ChameleonDescription />
          <CatDescription />
        </div>
        <h6>try to beat the score by being faster than other players</h6>

        <div className="d-grid gap-2 mx-2">
          <Button
            variant="light"
            onClick={() => setUi({ ...ui, checkScores: true })}
          >
            Check Top Scores
          </Button>
          <Button
            style={{ display: ui.instruction ? "none" : "inline" }}
            variant="warning"
            onClick={() => setUi({ ...ui, gameStart: true })}
          >
            Start
          </Button>
          <Button
            style={{ display: ui.instruction ? "inline" : "none" }}
            variant="warning"
            onClick={() => setUi({ ...ui, instruction: false })}
          >
            Close Instructions
          </Button>
        </div>
      </div>
    </>
  );
}
