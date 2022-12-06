import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import ProfilePhoto from "../views/ProfilePhoto"

export default function Navbar() {

  const {user, logout} = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }

  const [ toggleMenu, setToggleMenu ] = useState(false)

  const handletoggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-danger px-3">
      <div className="container-fluid">
        <button onClick={handletoggleMenu} className={toggleMenu ? "navbar-toggler" : "navbar-toggler collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={toggleMenu ? "true" : "false"}aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={toggleMenu ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/onsale">Productos en promoción 🔥</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/cart">Carrito (0) 🛒</Link>
            </li>
            <li className="nav-item">
              <Link className={toggleMenu ? "nav-link" : "d-none"} onClick={handleLogout}>Cerrar sesión</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link disabled">{user.displayName || user.email}</Link>
            </li> */}
          </ul>
        </div>
        <div className={toggleMenu ? "d-none" : "d-flex align-items-center"}>
          {/* <ProfilePhoto /> */}
          <Link className="m-2 border-success navbar-brand nav-link" href="#">{user.displayName || user.email}</Link>
          <button onClick={handleLogout} className="btn btn-light btn-sm">Cerrar sesión</button>
        </div>
      </div>
    </nav>
      )
  
}