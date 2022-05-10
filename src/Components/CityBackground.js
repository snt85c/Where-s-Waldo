import cityBackground from "../img/s020gwdtsen31.png";

export default function CityBackground({
  setCoordinates,
  coordinates,
  ui
}) {
  return (
    <img
      scr={cityBackground}
      onMouseMove={(e) => {
        if (ui.isGameStart && !ui.isGameOver && !ui.isInstructionOverlayOpen) {
          //the screen wont move is the game is yet to start, won, or the instruction overlay is open, pausing the game
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
        backgroundPosition: `${-coordinates.screenX * 1.2}px ${
          -coordinates.screenY * 2
        }px`
      }}
      alt="#"
    />
  );
}
