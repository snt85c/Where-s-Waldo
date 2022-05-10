import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useUserAuth } from "../UserAuthContext";


export default function ScoresOverlay({ ui, setUi, finalScore }) {
  const [scores, setScores] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "scores"));
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        data.sort((a, b) => a.time - b.time);
        data = data.filter((a) => a.time != 0);
        setScores(data);
      } catch (err) {}
    }
    getData();
  }, [ui.isGameOver]);

  function ShowCurrentScore() {
    return (
      <>
      <div style={{ fontSize: "0.8rem", color: "gray" }}> your score</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: "5px",
          }}
        >
          <img
            style={{ borderRadius: "50%" }}
            width="50px"
            height="50px "
            src={user.photoURL}
          />
          <div
            style={{
              minWidth: "120px",
              fontSize: "1.2rem",
              fontWeight: "bolder",
              color: "#ffc20d",
            }}
          >
            {user.displayName ? user.displayName : "Anonymous"}{" "}
          </div>
          <div
            style={{
              minWidth: "120px",
              fontSize: "1.2rem",
              fontWeight: "bolder",
              color: "#ffc20d",
            }}
          >
            {finalScore} seconds
          </div>
        </div>
      </>
    );
  }

  function ShowScores() {
    const result = scores.map((score, i) => (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "5px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              color: "#ffc20d",
              fontWeight: "bolder",
            }}
          >
            {i + 1}
          </div>
          <img
            style={{ borderRadius: "50%" }}
            width="35px"
            height="35px "
            src={score.image}
          />
          <div style={{ minWidth: "120px" }}>{score.name} </div>
          <div style={{ minWidth: "120px" }}>{score.time} seconds</div>
        </div>
      </>
    ));

    return (
      <>
        <div
          style={{
            overflow: "hidden",
            maxHeight: "220px",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "gray" }}> best scores</div>
          {result}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: ui.isScoresOverlayOpen ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          zIndex: "4",
          top: "50%",
          left: "50%",
          transform: ` translate(-50%, -50%)`,
          width: "600px",
          height: "400px",
          backgroundColor: "#212529",
          borderRadius: "4%",
          border: "3px solid white",
          padding: "2%",
          color: "white",
          textAlign: "center",
        }}
      >
        <ShowScores />
        {ui.isGameOver && <ShowCurrentScore />}
        <Button
          variant="light"
          onClick={() => setUi({ ...ui, isScoresOverlayOpen: false })}
        >
          Close Top Scores
        </Button>
      </div>
    </>
  );
}
