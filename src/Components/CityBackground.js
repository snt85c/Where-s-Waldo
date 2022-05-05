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
        if (ui.gameStart && !ui.gameOver) {
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
