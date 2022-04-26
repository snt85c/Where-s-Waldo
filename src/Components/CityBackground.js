import cityBackground from "../img/s020gwdtsen31.png";

export default function CityBackground({setScreenX, setScreenY,screenX, screenY, setClickX, setClickY}) {
    return (
      <img
        scr={cityBackground}
        onMouseMove={(e) => {
          setScreenX(e.pageX);
          setScreenY(e.pageY);
        }}
        onTouchMove={(e) => {
          setScreenX(e.changedTouches[0].pageX);
          setScreenY(e.changedTouches[0].pageY);
        }}
        onClick={(e) => {
          setClickX(e.pageX);
          setClickY(e.pageY);
        }}
        style={{
          position: "absolute",
          minWidth: "100vw",
          minHeight: "100vh",
          background: `url(${cityBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${-screenX * 1.2}px ${-screenY * 2}px`,
        }}
        alt="#"
      />
    );
  }