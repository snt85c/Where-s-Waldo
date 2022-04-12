import {Navigate} from "react-router-dom"
import { useUserAuth } from "./UserAuthContext";
export default function ProtectedRoute({children}){
    //get user from the useUserAuth (a React Context in UserAuthContext) if user is falsy, then return to the root, otherwise returns "children", which is the main page. this prevents the user to navigate to main by modifying the url
    let {user} = useUserAuth();
    if(!user){
        return <Navigate to="/" />
    }
    return children
}