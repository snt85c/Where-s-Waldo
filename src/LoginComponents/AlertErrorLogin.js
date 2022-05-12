import { Alert } from "react-bootstrap"

export default function AlertErrorLogin({error}){

    return(<>
    {error && (
          <Alert
            style={{
              position: "absolute",
              top: "100px",
              left: "50vw",
              transform: ` translate(-50%, 0%)`,
              zIndex: "4",
            }}
            className={` ${!error ? "fadeOut" : ""}`}
            variant="danger"
          >
            {error}
          </Alert>
        )}

    </>)
}