import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function SearchOverlay({
  gameStart,
  clickX,
  clickY,
  screenX,
  screenY,
  itemCat,
  itemPirate,
}) {
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  const [alertOverlay, setAlertOverlay] = useState({
    show: false,
    name: "",
    variant: "",
  });
  useEffect(() => {
    console.log(alertOverlay);
  }, [alertOverlay]);

  useEffect(() => {
    setPosX(clickX + (clickX - screenX) * 1.2 - 50);
    setPosY(clickY + (clickY - screenY) * 2 - 50);
    //set the position based on: the clicked coordinates plus the difference between the clicked coordinates and the current coordinates from onMouseMove, multiplied by the modifier, minus 50 (to have it centered on the target)
  }, [screenX, screenY]);

  useEffect(() => {
    setPosX(clickX - 50);
    setPosY(clickY - 50);
  }, [clickX, clickY]);

  function FindCat() {
    if (
      clickX >= itemCat.xStart &&
      clickX <= itemCat.xEnd &&
      clickY >= itemCat.yStart &&
      clickY <= itemCat.yEnd
    ) {
      console.log("cat is found");
      setAlertOverlay({ show: true, name: "cat is found", variant: "success" });
          setTimeout(()=>setAlertOverlay({ ...alertOverlay, show: false }), 2000)

    } else {
      setAlertOverlay({
        show: true,
        name: "incorrect: not the cat",
        variant: "warning",
      });
      setTimeout(()=>setAlertOverlay({ ...alertOverlay, show: false }), 2000)

    }
  }

  function FindPirate() {
    if (
      clickX >= itemPirate.xStart &&
      clickX <= itemPirate.xEnd &&
      clickY >= itemPirate.yStart &&
      clickY <= itemPirate.yEnd
    ) {
      console.log("pirate is found");
      setAlertOverlay({
        show: true,
        name: "pirate is found",
        variant: "success",
      });
      setTimeout(()=>setAlertOverlay({ ...alertOverlay, show: false }), 2000)

    } else {
      console.log("not the pirate");
      setAlertOverlay({
        show: true,
        name: "incorrect: not the pirate",
        variant: "warning",
      });
      setTimeout(()=>setAlertOverlay({ ...alertOverlay, show: false }), 2000)

    }
  }

  return (
    <>
      <Alert
        className={` ${!alertOverlay.show ? "fadeOut" : ""}`}
        variant={alertOverlay.variant}
        style={{
          position: "absolute",
          top: "100px",
          left: "50vw",
          transform: ` translate(-50%, 0%)`,
          zIndex: "4",
        }}
        // onTransitionEnd={() =>
        //   setAlertOverlay({ ...alertOverlay, show: false }), 2000)
        // }
      >
        {alertOverlay.name}
      </Alert>
      <div
        style={{
          position: "fixed",
          zIndex: gameStart ? "3" : "-2",
          width: "200px",
          height: "100px",
          top: posY,
          left: posX,
          //extra overlay between the target (round) and the selection box (rectangle), to avoid movement triggered when moving the mouse between the empty spaces of the two elements
        }}
      >
        <div
          style={{
            position: "fixed",
            zIndex: gameStart ? "3" : "-2",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "3px solid red",
            top: posY,
            left: posX,
          }}
          //circle target
        ></div>
        <div
          style={{
            position: "fixed",
            zIndex: gameStart ? "3" : "-2",
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            border: "3px solid white",
            top: posY + 3,
            left: posX + 3,
          }}
          //second color target
        ></div>
        <div
          style={{
            position: "fixed",
            zIndex: gameStart ? "3" : "-2",
            width: "100px",
            height: "100px",
            padding: "10px",
            opacity: "80%",
            borderRadius: "5px",
            backgroundColor: "#212529",
            border: "1px solid white",
            top: posY,
            left: posX + 100,
            color: "white",
            fontWeight: "bolder",
            textAlign: "center",
          }}
          //rectangle overlay
        >
          <div onClick={FindCat} style={{ cursor: "pointer" }}>
            Cat
          </div>
          <div onClick={FindPirate} style={{ cursor: "pointer" }}>
            Pirate
          </div>
        </div>
      </div>
    </>
  );
}
