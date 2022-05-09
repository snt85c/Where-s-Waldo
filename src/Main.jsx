import { useState, useEffect } from "react";
import { collection, getDocs,  doc, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import Navbar from "./Navbar";
import CityBackground from "./Components/CityBackground";
import SkyBackground from "./Components/SkyBackground";
import TestingBar from "./Components/TestingBar";
import InstructionsOverlay from "./Components/InstructionsOverlay";
import ScoresOverlay from "./Components/ScoresOverlay";
import SearchOverlay from "./Components/SearchOverlay";
import GameoverOverlay from "./Components/GameoverOverlay";
import { useUserAuth } from "./UserAuthContext";


export default function Main() {
  const { user } = useUserAuth();

  const [coordinates, setCoordinates] = useState({
    screenX: 350,
    screenY: 400,
    clickX: 0,
    clickY: 0,
  });
  const [itemCat, setItemCat] = useState();
  const [itemPirate, setItemPirate] = useState();
  const [ui, setUi] = useState({
    gameStart: false,
    gameOver: false,
    checkScores: false,
    instruction:false,
    pirateFound:false,
    catFound:false,
  });
  const [finalScore, setFinalScore] = useState(0)

useEffect(()=>{console.log(ui, finalScore)},[ui.gameOver])
  useEffect(()=>{
    if(ui.gameOver){
      addDoc(collection(db, "scores"), {
        name: user.displayName?user.displayName:"Anonymous",
        image: user.photoURL,
        time: finalScore
      });
    }
  },[ui.gameOver])

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
      <Navbar ui={ui} setUi={setUi} setFinalScore={setFinalScore} />
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
        ui={ui}
      />
      <SearchOverlay
        coordinates={coordinates}
        ui={ui}
        setUi={setUi}
        itemCat={itemCat}
        itemPirate={itemPirate}
      />
      <InstructionsOverlay setUi={setUi} ui={ui} />
      <ScoresOverlay setUi={setUi} ui={ui} />
      <GameoverOverlay setUi={setUi} ui={ui} finalScore={finalScore}/>
    </>
  );
}
