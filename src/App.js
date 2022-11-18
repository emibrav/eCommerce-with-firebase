import { Routes, Route } from "react-router-dom";
import Home from "./views/Home"
import Login from "./views/Login";
import Register from "./views/Register";
import {AuthProvider} from "./context/authContext"
import { ProtectedRoute } from "./views/ProtectedRoute";
import OnSale from "./views/OnSale";
import Navbar from "./components/Navbar";
import Cart from "./views/Cart";

function App() {
  return (
    <div className="min-vh-100 min-vw-100 d-inline-block bg-light bg-gradient">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/onsale" element={<OnSale/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
