import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import cityBackground from "./s020gwdtsen31.png";
import skyBackground from "./11005249.jpg";

export default function Main() {
  const [screenX, setScreenX] = useState(350); //350
  const [screenY, setScreenY] = useState(100);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (window.innerWidth > 300 && window.innerWidth < 450) {
      setScreenSize(6);
    } else if (window.innerWidth > 450 && window.innerWidth < 650) {
      setScreenSize(4.5);
    } else if (window.innerWidth > 650 && window.innerWidth < 1000) {
      setScreenSize(2);
    } else if (window.innerWidth > 1000) {
      setScreenSize(1.2);
    }
    console.log(
      "current ScreenSize:",
      screenSize,
      " width:",
      window.innerWidth
    );
  }, [window.innerWidth]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          minWidth:"100%",
          position: "absolute",
          zIndex: "20",
          top: "80px",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        ClickX{clickX}{" "}
        ClickY{clickY}
      </div>
      <div
        onMouseMove={(e) => {
          setScreenX(e.clientX);
          setScreenY(e.clientY);
        }}
        
      >
        <div
          style={{
            backgroundImage: `url(${skyBackground})`,
            position: "absolute",
            zIndex: "-2",
            minWidth: "100vw",
            minHeight: "100vh",
            backgroundPosition: "center",
            backgroundPositionX: `${-screenX / 10}px`,
            overflow: "hidden",
          }}
        ></div>
        <img
          scr={cityBackground}
          onClick={(e) => {
            const { width, height } = e.target.getBoundingClientRect();
            const { offsetX, offsetY } = e.nativeEvent;
            setClickX(Math.round((offsetX / width) * 100));
            setClickY(Math.round((offsetY / height) * 100));
            // console.log(Math.round((offsetX / width) * 100) );
            // console.log(offsetX, offsetY);
          }}
          style={{
            position: "absolute",
            minWidth: "100vw",
            minHeight: "100vh",
            background: `url(${cityBackground})`,
            backgroundPosition: "center",
            backgroundPosition: `${-screenX * screenSize}px ${-screenY * 2}px`,
            transform: `translate3d(0, 0, 0)`,
          }}
        />
      </div>
    </>
  );
}
