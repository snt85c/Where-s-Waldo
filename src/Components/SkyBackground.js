import skyBackground from "../img/11005249.jpg";

export default function SkyBackground({ X, Y}) {
    return (
      <div
        style={{
          backgroundImage: `url(${skyBackground})`,
          position: "absolute",
          zIndex: "-2",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundPosition: `${-X}px  ${Y?-Y:0}px`,
          overflow: "hidden",
        }}
      ></div>
    );
  }