import { Link } from "react-router-dom";

export default function SignUpButton(){

    return(<>
     <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          dont have an account? 
          <Link to="/signup">{" "}Sign-up</Link>
        </div>
    </>)
}