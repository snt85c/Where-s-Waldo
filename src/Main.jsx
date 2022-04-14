import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import background from "./s020gwdtsen31.png";
import skyBackground from "./11005249.jpg";

export default function Main() {
  const [clientX, setClientX] = useState(); //350
  const [clientY, setClientY] = useState();
  const [screenSize, setScreenSize] = useState();
  // console.log(clientX)

  useEffect(() => {
    if (window.innerWidth < 500) {
      setScreenSize(7);
    } else if (window.innerWidth > 500 && window.innerWidth < 1000) {
      setScreenSize(2);
    } else if (window.innerWidth > 1000) {
      setScreenSize(1.2);
    }
    // console.log(screenSize)
    // console.log(window.innerWidth)
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${skyBackground})`,
          position: "absolute",
          zIndex: "-2",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundPosition: "center",
          backgroundPositionX: `${-clientX / 10}px`,
        }}
      ></div>
      <div
        onMouseMove={(e) => {
          setClientX(e.clientX);
          setClientY(e.clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault()
          setClientX(e.changedTouches[0].clientX);
          setClientY(e.changedTouches[0].clientY);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundPositionX: `${-clientX * screenSize}px`, //*1.2
          backgroundPositionY: `${-clientY * 2}px`, //*2
        }}
      ></div>
    </>
  );
}
