import { useUserAuth } from "./UserAuthContext";
import Navbar from "./Navbar";
import { useState } from "react";
import background from "./s020gwdtsen31.png";
export default function Main() {
  const [event, setEvent] = useState("");

  return (
    <>
      <Navbar />
      <div
        onMouseMove={(e) => setEvent(e)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundPositionX: `${event && -event.pageX * 1.2}px`,
          backgroundPositionY: `${event && -event.pageY * 2}px`,
        }}
      ></div>
    </>
  );
}
