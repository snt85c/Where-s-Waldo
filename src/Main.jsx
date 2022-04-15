import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import background from "./s020gwdtsen31.png";
import skyBackground from "./11005249.jpg";

export default function Main() {
  const [clientX, setClientX] = useState(0); //350
  const [clientY, setClientY] = useState(0);
  const [screenSize, setScreenSize] = useState();
  // console.log(clientX)

  useEffect(() => {
    if (window.innerWidth < 500) {
      setScreenSize(7);
    } else if (window.innerWidth > 500 && window.innerWidth < 650) {
      setScreenSize(3.5);
    }else if(window.innerWidth > 650 && window.innerWidth < 1000){
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
          backgroundPositionX: `${-clientX / 10}px`,
          overflow:"-moz-hidden-unscrollable"
        }}
      ></div>
      <img
      // scr={background}
        onMouseMove={(e) => {
          setClientX(e.clientX);
          setClientY(e.clientY);
        }}
        onTouchMove={(e) => {
          setClientX(e.changedTouches[0].screenX);
          setClientY(e.changedTouches[0].screenY);
          // console.log(e.changedTouches[0].screenX, e.changedTouches[0].screenY)

        }}
        // onTouchEnd={(e)=>{console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}}
        // onTouchStart={(e)=>{
        //   setClientX(clientX - (clientX - e.changedTouches[0].screenX))
        //   setClientY(clientY - (clientY - e.changedTouches[0].screenY))
        //   }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          overflow:"-moz-hidden-unscrollable",
          backgroundPosition: `${-clientX * screenSize}px ${-clientY * 2}px`,
          // transform: `translate3d(0, 0, 0)`,
          // backgroundPositionX: `${-clientX * screenSize}px`, //*1.2
          // backgroundPositionY: `${-clientY * 2}px`, //*2
          transform: `translate( ${clientX }px ,  ${clientY}px), 0`,
        }}
      />
    </>
  );
}
