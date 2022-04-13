import Navbar from "./Navbar";
import { useState } from "react";
import background from "./s020gwdtsen31.png";
export default function Main() {
  const[clientX, setClientX] = useState()
  const[clientY, setClientY] = useState()
  return (
    <>
      <Navbar />
      <div
        onMouseMove={(e) => {setClientX(e.clientX); setClientY(e.clientY)}}
        onTouchMove={(e) =>{setClientX(e.changedTouches[0].clientX); setClientY(e.changedTouches[0].clientY)}}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundPositionX: `${ -clientX * 1.2}px`,
          backgroundPositionY: `${ -clientY * 2}px`,
        }}
      ></div>
    </>
  );
}
