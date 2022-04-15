import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import cityBackground from "./s020gwdtsen31.png";
import skyBackground from "./11005249.jpg";

export default function Main() {
  const [screenX, setScreenX] = useState(350); //350
  const [screenY, setScreenY] = useState(100);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [screenSize, setScreenSize] = useState(350);

  console.log(screenX, screenY)

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (window.innerWidth < 500) {
      setScreenSize(7);
    } else if (window.innerWidth > 500 && window.innerWidth < 650) {
      setScreenSize(3.5);
    } else if (window.innerWidth > 650 && window.innerWidth < 1000) {
      setScreenSize(2);
    } else if (window.innerWidth > 1000) {
      setScreenSize(1.2);
    }
    // console.log(screenSize)
    // console.log(window.innerWidth)
  }, [window.innerWidth]);

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
          backgroundPositionX: `${-screenX / 10}px`,
          overflow: "hidden",
        }}
      ></div>
      <img
        scr={cityBackground}
        onMouseMove={(e) => {
          setScreenX(e.clientX);
          setScreenY(e.clientY);
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // if(touchStartX - touchEndX > 50 || touchStartY - touchEndY > 50 ){
            // console.log(touchStartX - touchEndX, touchStartY - touchEndY)
            setScreenX(e.changedTouches[0].screenX);
            setScreenY(e.changedTouches[0].screenY);
          // }
          // console.log(e.changedTouches[0].screenX, e.changedTouches[0].screenY)
        }}
        onTouchStart={(e) => {
          setTouchStartX(e.changedTouches[0].screenX);
            setTouchStartY(e.changedTouches[0].screenY);
            // console.log(touchStartX, touchStartY, "START");
        }}
        onTouchEnd={(e) => {
          setTouchEndX(e.changedTouches[0].screenX);
            setTouchEndY(e.changedTouches[0].screenY);
            // console.log(touchEndX, touchEndY, "END");
        }}
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          position:"absolute",
          zIndex:"-1",
          top:"10%",
          left:"-50%",
          minWidth: "300vw",
          minHeight: "300vh",
          background: `url(${cityBackground}) center center no-repeat`,
          backgroundPosition: "center",
          // backgroundPosition: `transform: translate( ${screenX}px ,${screenY}px)`,

          // overflow: "-moz-hidden-unscrollable",
          // backgroundPosition: `${-screenX * screenSize}px ${-screenY * 2}px`, 
          // transform: `translate3d(0, 0, 0)`,
          // backgroundPositionX: `${-clientX * screenSize}px`, //*1.2
          // backgroundPositionY: `${-clientY * 2}px`, //*2
          transform: `translate( ${-screenX * screenSize}px ,${-screenY * 2.6}px)`
        }}
      />
    </>
  );
}
