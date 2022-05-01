import cityBackground from "../img/s020gwdtsen31.png";

export default function CityBackground({setScreenX, setScreenY,screenX, screenY, setClickX, setClickY, gameStart}) {
    return (
      <img
        scr={cityBackground}
        onMouseMove={(e) => {
          if(gameStart){
            setScreenX(e.pageX);
            setScreenY(e.pageY);
          }
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
          backgroundPosition: `${-screenX }px ${-screenY * 1.5 }px`, //*1.2 *2
        }}
        alt="#"
      />
    );
  }