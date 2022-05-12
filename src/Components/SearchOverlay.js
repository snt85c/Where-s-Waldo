import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function SearchOverlay({
  ui,
  setUi,
  coordinates,
  itemCat,
  itemPirate,
  itemChameleon,
}) {
  //posX and posX is the calculated place where the overlay for the search sould be, depending on mouseclick and mousemove, this way they stay locked on the same screen area
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [alertOverlay, setAlertOverlay] = useState({
    isAlertShown: false,
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

  useEffect(() => {
    //when all the items are found, set gameover to true
    if (ui.isPirateFound && ui.isCatFound && ui.isChameleonFound) {
      setUi({ ...ui, isGameOver: true });
    }
  }, [ui.isPirateFound, ui.isCatFound, ui.isChameleonFound]);

  useEffect(() => {
    //on initial click, set coordinates as such, so that the overlay is centered on the click
    setPosition({
      x: coordinates.clickX - 50,
      y: coordinates.clickY - 50,
    });
  }, [coordinates.clickX, coordinates.clickY]);

  function find(name) {
    //when clicking the option, it will use a switch case to determine which set of data to load (as: itemCat, itemChameleon, itemPirate instead of having 3 separate functions with the data hardwired to them)
    let data = {};
    switch (name) {
      case "Cat":
        data = itemCat;
        break;
      case "Chameleon":
        data = itemChameleon;
        break;
      case "Pirate":
        data = itemPirate;
        break;
      default:
        console.log("error: no data loaded");
        break;
    }
    if (
      coordinates.clickX >= data.xStart &&
      coordinates.clickX <= data.xEnd &&
      coordinates.clickY >= data.yStart &&
      coordinates.clickY <= data.yEnd
    ) {
      setAlertOverlay({
        isAlertShown: true,
        name: `the ${name} is found`,
        variant: "success",
      });
      setUi({ ...ui, [`is${name}Found`]: true });
    } else {
      setAlertOverlay({
        isAlertShown: true,
        name: `Incorrect: this is not the ${name}`,
        variant: "warning",
      });
    }
    setTimeout(
      () => setAlertOverlay({ variant: "", show: false, name: "" }),
      2000
    );
  }

  function ItemList() {
    const names = ["Cat", "Pirate", "Chameleon"];
    const result = names.map((name) => {
      let variable = {};
      switch (name) {
        case "Cat":
          variable = ui.isCatFound;
          break;
        case "Pirate":
          variable = ui.isPirateFound;
          break;
        case "Chameleon":
          variable = ui.isChameleonFound;
          break;
        default:
          console.log("error in searchOverlay: function ItemList ")
      }

      return (
        <div
          className="overlayOption"
          onClick={() => find(`${name}`)}
          style={{
            display: variable ? "none" : "flex",
          }}
        >
          {name}
        </div>
      );
    });
    return (
      <>
        <div
          style={{
            display: ui.isGameOver ? "none" : "inline",
            position: "fixed",
            zIndex: ui.isGameStart ? "3" : "-2",
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
            fontSize: "0.9rem",
          }}
          //rectangle overlay with options
        >
          {result}
        </div>
      </>
    );
  }

  return (
    <>
      <Alert
        //alert overlay to notify the user if the element selected has been found or not
        className={` ${!alertOverlay.isAlertShown ? "fadeOut" : ""}`}
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
          zIndex: ui.isGameStart ? "3" : "-2",
          width: "200px",
          height: "100px",
          top: position.y,
          left: position.x,
          //extra overlay between the target (round) and the selection box (rectangle), to avoid movement triggered when moving the mouse between the empty spaces of the two elements
        }}
      >
        <div
          style={{
            display: ui.isGameOver ? "none" : "inline",
            position: "fixed",
            zIndex: ui.isGameStart ? "3" : "-2",
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
            display: ui.isGameOver ? "none" : "inline",
            position: "fixed",
            zIndex: ui.isGameStart ? "3" : "-2",
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            border: "3px solid white",
            top: position.y + 3,
            left: position.x + 3,
          }}
          //circle white target
        ></div>

        <ItemList />
      </div>
    </>
  );
}
