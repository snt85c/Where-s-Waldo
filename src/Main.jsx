import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import cityBackground from "./s020gwdtsen31.png";
import skyBackground from "./11005249.jpg";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

export default function Main() {
  const [screenX, setScreenX] = useState(350); //350
  const [screenY, setScreenY] = useState(100);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [screenSize, setScreenSize] = useState(0);
  const [itemCat, setItemCat] = useState();
  const [itemPirate, setItemPirate] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          if (doc.id === "cat") {
            setItemCat(doc.data());
          }
          if (doc.id === "pirateKing") {
            setItemPirate(doc.data());
          }
        });
      } catch (err) {}
    }
    getData();
  }, []);

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
  }, [window.innerWidth]);

  function TestingBar() {
    return (
      <div
        style={{
          display: "flex",
          minWidth: "100%",
          position: "absolute",
          zIndex: "20",
          top: "70px",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          backgroundColor: "white",
        }}
      >
        ClickX
        <div style={{ color: "red", fontWeight: "bolder" }}>{clickX} </div>
        ClickY
        <div style={{ color: "red", fontWeight: "bolder" }}>{clickY}</div>
        ScreenSize
        <div style={{ color: "red", fontWeight: "bolder" }}>{screenSize}</div>
        coordinates:
        <div style={{ color: "red", fontWeight: "bolder" }}>
          {screenX} {screenY}
        </div>
      </div>
    );
  }
  //cat coordinates
  //x658 - 676
  //y280 -300

  //pirateKing coordinates
  //x1147 - 1163
  //y304 -331

  useEffect(() => {
    if (itemCat && itemPirate) {
      if (
        clickX >= itemCat.xStart &&
        clickX <= itemCat.xEnd &&
        clickY >= itemCat.yStart &&
        clickY <= itemCat.yEnd
      ) {
        console.log("cat is found");
      } else if (
        clickX >= itemPirate.xStart &&
        clickX <= itemPirate.xEnd &&
        clickY >= itemPirate.yStart &&
        clickY <= itemPirate.yEnd
      ) {
        console.log("pirate is found");
      } else {
        console.log("keep trying");
      }
    }
  }, [clickX, clickY]);

  function SkyBackground() {
    return (
      <div
        style={{
          backgroundImage: `url(${skyBackground})`,
          position: "absolute",
          zIndex: "-2",
          minWidth: "100vw",
          minHeight: "100vh",
          // backgroundPosition: "center",
          backgroundPositionX: `${-screenX / 4}px`,
          overflow: "hidden",
        }}
      ></div>
    );
  }

  return (
    <>
      <Navbar />
      <TestingBar />
      <SkyBackground />
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
          // transform: `translate( ${-screenX}px,  ${-screenY}px)`,
          // transform: `translate3d(0, 0, 0)`,
        }}
      />
    </>
  );
}
