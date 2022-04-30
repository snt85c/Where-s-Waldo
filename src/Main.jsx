import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import Navbar from "./Navbar";
import CityBackground from "./Components/CityBackground";
import SkyBackground from "./Components/SkyBackground";
import TestingBar from "./Components/TestingBar";
import InstructionsOverlay from "./Components/InstructionsOverlay";
import ScoresOverlay from "./Components/ScoresOverlay";

export default function Main() {
  const [screenX, setScreenX] = useState(350); //350
  const [screenY, setScreenY] = useState(100);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [itemCat, setItemCat] = useState();
  const [itemPirate, setItemPirate] = useState();
  const [gameStart, setGameStart] = useState(false);
  const [checkScores, setCheckScores] = useState(false)

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

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   if (window.innerWidth > 300 && window.innerWidth < 450) {
  //     setScreenSize(6);
  //   } else if (window.innerWidth > 450 && window.innerWidth < 650) {
  //     setScreenSize(4.5);
  //   } else if (window.innerWidth > 650 && window.innerWidth < 1000) {
  //     setScreenSize(2);
  //   } else if (window.innerWidth > 1000) {
  //     setScreenSize(1.2);
  //   }
  // }, [window.innerWidth]);

  
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



  return (
    <>
      <Navbar gameStart={gameStart}/>
      {/* <TestingBar
        clickX={clickX}
        clickY={clickY}
        screenSize={screenSize}
        screenX={screenX}
        screenY={screenY}
      /> */}
      <SkyBackground
        screenX={screenX / 20}
      />
      <CityBackground
        setScreenX={setScreenX}
        setScreenY={setScreenY}
        setClickX={setClickX}
        setClickY={setClickY}
        screenX={screenX}
        screenY={screenY}
        gameStart={gameStart}
      />
      <InstructionsOverlay gameStart={gameStart} setGameStart={setGameStart} setCheckScores={setCheckScores}/>
      <ScoresOverlay checkScores={checkScores} setCheckScores={setCheckScores}/>
    </>
  );
}
