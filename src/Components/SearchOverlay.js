import { useState, useEffect } from "react";

export default function SearchOverlay({
  gameStart,
  clickX,
  clickY,
  screenX,
  screenY,
}) {
  const [posX, setPosX] = useState();
  const [posY, setPosY] = useState();
  console.log(clickX - screenX)

  useEffect(() => {
    setPosX((clickX + (clickX - screenX))-40);
    setPosY((clickY + (clickY - screenY) * 1.5) -40 );
  }, [screenX, screenY]);

  useEffect(() => {
    setPosX(clickX);
    setPosY(clickY);
  }, [clickX, clickY]);
  
  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: gameStart ? "3" : "-2",
          width: "100px",
          height: "100px",
          backgroundColor: "white",
          opacity: "50%",
          borderRadius: "50%",
          top: posY,
          left: posX,
        }}
      ></div>
    </>
  );
}
