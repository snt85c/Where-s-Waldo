import cityBackground from "../img/cityBackground.png";
import { useState } from "react";
export default function CityBackground({ setCoordinates, coordinates, ui }) {
  return (
    <img
      scr={cityBackground}
      onTouchStart={(e) => {
    
      }}
      onTouchMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          setCoordinates({
            ...coordinates,
            screenX: e.touches[0].pageX ,
            screenY: e.touches[0].pageY,
          });
        }
      }}
      onTouchEnd={(e)=>{
  
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
            ? `${-coordinates.screenX * 4}px ${-coordinates.screenY * 2}px`
            : `${-coordinates.screenX * 1.2}px ${-coordinates.screenY * 2}px`,
      }}
      alt="#"
    />
  );
}
