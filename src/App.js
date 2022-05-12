import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Login from "./LoginComponents/Login";
import Signup from "./Signup";
import NoPath from "./NoPath"
import { UserAuthContextProvider } from "./UserAuthContext";
//necessary import for bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css"

function App() {
  return (
    <>
      <HashRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute ><Main /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoPath />} />
          </Routes>
        </UserAuthContextProvider>
      </HashRouter>
    </>
  );
}

export default App;
