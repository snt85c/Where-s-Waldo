import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function SearchOverlay({
  ui,
  setUi,
  coordinates,
  itemCat,
  itemPirate,
}) {
  //posX and posX is the calculated place where the overlay for the search sould be, depending on mouseclick and mousemove, this way they stay locked on the same screen area
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [alertOverlay, setAlertOverlay] = useState({
    show: false,
    name: "",
    variant: "",
  });

  useEffect(() => {
    //on mouseMove, set the position based on: the clicked coordinates plus the difference between the clicked coordinates and the current coordinates from onMouseMove, multiplied by the modifier, minus 50 (to have it centered on the target)
    setPosition({
      x:
        coordinates.clickX +
        (coordinates.clickX - coordinates.screenX) * 1.2 -
        50,
      y:
        coordinates.clickY +
        (coordinates.clickY - coordinates.screenY) * 2 -
        50,
    });
  }, [coordinates.screenX, coordinates.screenY]);

  useEffect(()=>{
    if(ui.pirateFound && ui.catFound){
      setUi({...ui,gameOver:true, gameStart:false})
    }
  },[ui])

  useEffect(() => {
    //on initial click, set coordinates as such, so that the overlay is centered on the click
    setPosition({
      x: coordinates.clickX - 50,
      y: coordinates.clickY - 50,
    });
  }, [coordinates.clickX, coordinates.clickY]);

  function FindCat() {
    if (
      coordinates.clickX >= itemCat.xStart &&
      coordinates.clickX <= itemCat.xEnd &&
      coordinates.clickY >= itemCat.yStart &&
      coordinates.clickY <= itemCat.yEnd
    ) {
      setAlertOverlay({
        show: true,
        name: "the Cat is found",
        variant: "success",
      });
      setUi({...ui,catFound:true})

    } else {
      setAlertOverlay({
        show: true,
        name: "incorrect: this is not the Cat",
        variant: "warning",
      });
    }
    setTimeout(
      () => setAlertOverlay({ variant: "", show: false, name: "" }),
      2000
    );
  }

  function FindPirate() {
    if (
      coordinates.clickX >= itemPirate.xStart &&
      coordinates.clickX <= itemPirate.xEnd &&
      coordinates.clickY >= itemPirate.yStart &&
      coordinates.clickY <= itemPirate.yEnd
    ) {
      setAlertOverlay({
        show: true,
        name: "the Pirate is found",
        variant: "success",
      });
      setUi({...ui,pirateFound:true})
    } else {
      setAlertOverlay({
        show: true,
        name: "Incorrect: this is not the Pirate",
        variant: "warning",
      });
    }
    setTimeout(
      () => setAlertOverlay({ variant: "", show: false, name: "" }),
      2000
    );
  }

  return (
    <>
      <Alert
        //alert overlay to notify the user if the element selected has been found or not
        className={` ${!alertOverlay.show ? "fadeOut" : ""}`}
        variant={alertOverlay.variant}
        style={{
          position: "absolute",
          top: "100px",
          left: "50vw",
          transform: ` translate(-50%, 0%)`,
          zIndex: "4",
        }}
      >
        {alertOverlay.name}
      </Alert>
      <div
        style={{
          position: "fixed",
          zIndex: ui.gameStart ? "3" : "-2",
          width: "200px",
          height: "100px",
          top: position.y,
          left: position.x,
          //extra overlay between the target (round) and the selection box (rectangle), to avoid movement triggered when moving the mouse between the empty spaces of the two elements
        }}
      >
        <div
          style={{
            display: ui.gameOver?"none":"inline",
            position: "fixed",
            zIndex: ui.gameStart ? "3" : "-2",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "3px solid red",
            top: position.y,
            left: position.x,
          }}
          //circle red target
        ></div>
        <div
          style={{
            display: ui.gameOver?"none":"inline",
            position: "fixed",
            zIndex: ui.gameStart ? "3" : "-2",
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            border: "3px solid white",
            top: position.y + 3,
            left: position.x + 3,
          }}
          //circle white target
        ></div>
        <div
          style={{
            display: ui.gameOver?"none":"inline",
            position: "fixed",
            zIndex: ui.gameStart ? "3" : "-2",
            width: "100px",
            height: "100px",
            padding: "10px",
            opacity: "80%",
            borderRadius: "5px",
            backgroundColor: "#212529",
            border: "1px solid white",
            top: position.y,
            left: position.x + 100,
            color: "white",
            fontWeight: "bolder",
            textAlign: "center",
          }}
          //rectangle overlay with options
        >
          <div onClick={FindCat} style={{ cursor: "pointer", display:ui.catFound?"none":"flex"}}>
            Cat
          </div>
          <div onClick={FindPirate} style={{ cursor: "pointer",display:ui.pirateFound?"none":"flex" }}>
            Pirate
          </div>
        </div>
      </div>
    </>
  );
}
