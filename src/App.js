import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Signup from "./Signup";
import { UserAuthContextProvider } from "./UserAuthContext";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserAuthContextProvider>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute ><Main /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
