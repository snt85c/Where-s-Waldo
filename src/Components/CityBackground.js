import cityBackground from "../img/cityBackground.png";
import { useState } from "react";
export default function CityBackground({ setCoordinates, coordinates, ui }) {
  return (
    <img
      scr={cityBackground}
      onTouchStart={(e) => {
        console.log(coordinates.clickX, coordinates.clickY)
      }}
      onTouchMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          setCoordinates({
            ...coordinates,
            screenX: e.touches[0].clientX + coordinates.clickX,
            screenY: e.touches[0].clientY + coordinates.clickY,
          });
        }
      }}
      onTouchEnd={(e)=>{
        setCoordinates({
          ...coordinates,
          clickX: e.changedTouches[0].clientX,
          clickY: e.changedTouches[0].clientY
        });
      }}
  
      onMouseMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          setCoordinates({
            ...coordinates,
            screenX: e.clientX ,
            screenY: e.clientY ,
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
        backgroundPosition: `${-coordinates.screenX * 1.2}px ${-coordinates.screenY * 2}px`,
      }}
      alt="#"
    />
  );
}
