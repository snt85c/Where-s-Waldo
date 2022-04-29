import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
export default function ScoresOverlay({ setCheckScores, checkScores }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "scores"));
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setScores(data);
      } catch (err) {}
    }
    getData();
  }, []);

scores.forEach((score)=>console.log(score.name + "=>" + score.time))

  return (
    <>
      <div
        style={{
          display: checkScores ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
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
        <Button variant="light" onClick={() => setCheckScores(false)}>
          Close Top Scores
        </Button>
      </div>
    </>
  );
}
