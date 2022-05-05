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
  const [coordinates, setCoordinates] = useState({
    screenX: 350,
    screenY: 400,
    clickX: 0,
    clickY: 0,
  });
  const [itemCat, setItemCat] = useState();
  const [itemPirate, setItemPirate] = useState();
  const [gameStart, setGameStart] = useState(false);
  const [checkScores, setCheckScores] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
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
      <Navbar gameStart={gameStart} />
      {/* <TestingBar
        clickX={coordinates.clickX}
        clickY={coordinates.clickY}
        screenX={coordinates.screenX}
        screenY={coordinates.screenY}
      /> */}
      <SkyBackground X={coordinates.screenX / 20} />
      <CityBackground
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        gameStart={gameStart}
      />
      <SearchOverlay
        coordinates={coordinates}
        gameStart={gameStart}
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
