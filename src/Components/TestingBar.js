export default function TestingBar({ clickX, clickY, screenX, screenY }) {
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
        coordinates:
        <div style={{ color: "red", fontWeight: "bolder" }}>
          {screenX} {screenY}
        </div>
      </div>
    );
  }