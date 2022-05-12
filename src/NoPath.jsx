import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import skyBackground from "./img/skyBackground.jpg";
export default function NoPath() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundImage: ` url(${skyBackground})`,
        }}
      >
        <div style={{ color: "white", fontSize: "3rem", fontWeight: "bolder" }}>
          There's nothing here!
        </div>
        <Button variant="warning"onClick={() => navigate("/")}>back</Button>
      </div>
    </>
  );
}
