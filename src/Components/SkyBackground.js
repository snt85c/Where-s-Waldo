import skyBackground from "../img/11005249.jpg";

export default function SkyBackground({screenX, screenY}) {
    return (
      <div
        style={{
          backgroundImage: `url(${skyBackground})`,
          position: "absolute",
          zIndex: "-2",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundPosition: `${-screenX}px  ${screenY?-screenY:0}px`,
          overflow: "hidden",
        }}
      ></div>
    );
  }