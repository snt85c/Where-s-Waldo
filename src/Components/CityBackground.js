import cityBackground from "../img/cityBackground.png";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function CityBackground({ setCoordinates, coordinates, ui }) {
  const [delta, setDelta] = useState({ X: 0, Y: 0 });
  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log(eventData),
    onSwiping: (eventData) => {
      if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
      setCoordinates({
        ...coordinates,
        screenX:
          eventData.dir === "Left"
            ? eventData.event.changedTouches[0].pageX - eventData.absX
            : eventData.dir === "Right"
            ? eventData.event.changedTouches[0].pageX + eventData.absX
            : coordinates.screenX,
        screenY:
          eventData.dir === "Up"
            ? eventData.event.changedTouches[0].pageY - eventData.absY
            : eventData.dir === "Down"
            ? eventData.event.changedTouches[0].pageY + eventData.absY
            : coordinates.screenY,
      });}
    },
  });

  return (
    <img
      {...handlers}
      scr={cityBackground}
      onTouchStart={(e) => {
        // console.log(coordinates.screenX, coordinates.screenY);
      }}
      onTouchMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move if the game is yet to start, won, or the instruction overlay is open, pausing the game
          // setCoordinates({
          //   ...coordinates,
          //   screenX: e.touches[0].pageX - delta.X,
          //   screenY: e.touches[0].pageY - delta.Y,
          // });
        }
      }}
      onTouchEnd={(e) => {
        // setTouchEndStart({...touchEndStart, xEnd:e.changedTouches[0].pageX, yEnd:e.changedTouches[0].pageY})
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
            ? `${-coordinates.screenX * 2}px ${-coordinates.screenY * 2}px`
            : `${-coordinates.screenX * 1.2}px ${-coordinates.screenY * 2}px`,
      }}
      alt="#"
    />
  );
}
