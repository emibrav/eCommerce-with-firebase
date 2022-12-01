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
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
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
//     <nav className="navbar navbar-expand-lg bg-success">
//       <div className="container-fluid">
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarScroll">
//           <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": "100px"}}>
//             <li className="nav-item">
//               <Link to="/" className="nav-link active" aria-current="page">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Favoritos</Link>
//             </li>
//             <li onClick={handletoggleMenu} className="nav-item dropdown">
//               <Link className={toggleMenu ? "nav-link dropdown-toggle show" : "nav-link dropdown-toggle"} to="#" role="button" data-bs-toggle="dropdown" aria-expanded={toggleMenu ? true : false}>
//                 Cuenta
//               </Link>
//               <ul className={toggleMenu ? "dropdown-menu show" : "dropdown-menu"}>
//                 <li><Link className="dropdown-item" to="/">Action</Link></li>
//                 <li><Link className="dropdown-item" to="/">Another action</Link></li>
//                 <li><hr className="dropdown-divider" /></li>
//                 <li><Link className="dropdown-item" to="/">Something else here</Link></li>
//               </ul>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link disabled" to="/">Link</Link>
//             </li>
//           </ul>
//           <form className="d-flex" role="search">
//             <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
//             <button className="btn btn-outline-dark" onClick={handleLogout} type="submit">Buscar</button>
//         <Link className="navbar-brand" to="/">
//           {/* <img src={user.photoURL} referrerPolicy="no-referrer" alt="profile" style={{"width":"38px", "height":"38px"}} className="d-inline-block align-text-top rounded-4" /> */}
//           <ProfilePhoto />
//         </Link>
//           <Link onClick={handletoggleMenu} className={toggleMenu ? "nav-link dropdown-toggle navbar-brand show" : "nav-link navbar-brand dropdown-toggle"} role="button" data-bs-toggle="dropdown" aria-expanded={toggleMenu ? true : false} to="/">{user.displayName || user.email}</Link>
//           <ul className={toggleMenu ? "dropdown-menu show" : "dropdown-menu"}>
//                 <li><Link className="dropdown-item" to="/">Action</Link></li>
//                 <li><Link className="dropdown-item" to="/">Another action</Link></li>
//                 <li><hr className="dropdown-divider" /></li>
//                 <li><Link className="dropdown-item" to="/">Something else here</Link></li>
//               </ul>
//           </form>
//         </div>
//       </div>
// </nav>
  )
  
}