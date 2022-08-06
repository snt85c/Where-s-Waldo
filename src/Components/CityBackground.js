import cityBackground from "../img/cityBackground.png";
import { useState } from "react";

export default function CityBackground({ setCoordinates, coordinates, ui }) {
  const [touchEnd, setTouchEnd] = useState({ xEnd: 0, yEnd: 0 });
  console.log(window.innerWidth);
  return (
    <img
      scr={cityBackground}
      onTouchStart={() => {
        // console.log(coordinates.screenX, coordinates.screenY);
      }}
      onTouchMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          // console.log(e.touches[0].pageX, e.touches[0].pageY)
          setCoordinates({
            ...coordinates,
            screenX: touchEnd.xEnd + e.touches[0].pageX,
            screenY: touchEnd.yEnd + e.touches[0].pageY,
          });
        }
      }}
      onTouchEnd={(e) => {
        setTouchEnd({
          xEnd: e.changedTouches[0].pageX,
          yEnd: e.changedTouches[0].pageY,
        });
        // console.log(touchEnd);
      }}
      onMouseMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          setCoordinates({
            ...coordinates,
            screenX: e.pageX,
            screenY: e.pageY,
          });
        }
      }}
      onClick={(e) => {
        setCoordinates({ ...coordinates, clickX: e.pageX, clickY: e.pageY });
      }}
      style={{
        position: "absolute",
        minWidth: "100vw",
        minHeight: "100vh",
        background: `url(${cityBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition:
          window.innerWidth < 600
            ? `${-coordinates.screenX * 3}px ${-coordinates.screenY * 2}px`
            : `${-coordinates.screenX * 1.2}px ${-coordinates.screenY * 2}px`,
      }}
      alt="#"
    />
  );
}
