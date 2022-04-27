import cat from "../img/cat.png";
import pirate from "../img/pirate.png";

import { Figure, Button } from "react-bootstrap";
export default function SearchOverlay({ gameStart, setGameStart }) {
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
          <h3 style={{fontWeight:"bolder"}}>Find the characters as fast as you can</h3>
          <h6>Once you click start, move the mouse around the screen to pan around the image</h6>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div /*style={{ display: "flex", flexDirection: "column" }}*/>
            <img width={80} height={100} alt="pirate" src={pirate} style={{border:"white 1px solid", borderRadius:"5%"}} />
            <div style={{ color: "gray" }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </div>
          </div>
          <div /*style={{ display: "flex", flexDirection: "column" }}*/>
            <img width={80} height={100} alt="cat" src={cat} style={{border:"white 1px solid", borderRadius:"5%"}}/>
            <div style={{ color: "gray" }}>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 mx-2">
          <Button variant="light" onClick={() => setGameStart(true)}>
            Start
          </Button>
        </div>
      </div>
    </>
  );
}
