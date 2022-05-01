import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import Navbar from "./Navbar";
import CityBackground from "./Components/CityBackground";
import SkyBackground from "./Components/SkyBackground";
import TestingBar from "./Components/TestingBar";
import InstructionsOverlay from "./Components/InstructionsOverlay";
import ScoresOverlay from "./Components/ScoresOverlay";
import SearchOverlay from "./Components/SearchOverlay";

export default function Main() {
  const [screenX, setScreenX] = useState(350);
  const [screenY, setScreenY] = useState(400);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [itemCat, setItemCat] = useState();
  const [itemPirate, setItemPirate] = useState();
  const [gameStart, setGameStart] = useState(false);
  const [checkScores, setCheckScores] = useState(false);

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

  return (
    <>
      <Navbar
        gameStart={gameStart}
      />
      {/* <TestingBar
        clickX={clickX}
        clickY={clickY}
        screenSize={screenSize}
        screenX={screenX}
        screenY={screenY}
      /> */}
      <SkyBackground screenX={screenX / 20} />
      <CityBackground
        setScreenX={setScreenX}
        setScreenY={setScreenY}
        setClickX={setClickX}
        setClickY={setClickY}
        screenX={screenX}
        screenY={screenY}
        gameStart={gameStart}
      />
      <SearchOverlay
        gameStart={gameStart}
        clickX={clickX}
        clickY={clickY}
        screenX={screenX}
        screenY={screenY}
        itemCat={itemCat}
        itemPirate={itemPirate}
      />
      <InstructionsOverlay
        gameStart={gameStart}
        setGameStart={setGameStart}
        setCheckScores={setCheckScores}
      />
      <ScoresOverlay
        checkScores={checkScores}
        setCheckScores={setCheckScores}
      />
    </>
  );
}
