import {useState} from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import GoogleLogo from "../images/logo-google.png";
import FacebookLogo from "../images/facebook-logo.png";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState();
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate()
  
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await login(user.email, user.password);
      navigate("/")
    } catch(error) {
      setError(error.message)
      console.log(error.code)
    }
  }

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate("/")
    }catch(error) {
      setError(error)
      console.log(error)
    }
  }

  const handleFacebookSingin = async () => {
    try {
      await loginWithFacebook();
      navigate("/")
    } catch(error) {
      if(error.message === "auth/account-exists-with-different-credential") {
        setError("Ya te has logueado previamente con Google, debes hacerlo nuevamente con ese método de autenticación")

      }
      console.log(error)
    }
  }

  return (
    <>
      <div className="p-3 w-100 d-flex align-items-center flex-column" >
        <h2>Login</h2>
        <p>Inicia sesión con tu cuenta o <Link to="/register">registrate</Link></p>
        <div className="d-grid">
          <button onClick={handleGoogleSignin} className="btn btn-outline-danger mb-2 d-flex align-items-center">
            <img  src={GoogleLogo} alt="" className="bg-white rounded-2" style={{width: "35px", height: "35px"}}/>
            <span className="ms-2">Iniciar sesión con Google</span>
          </button>
          <button onClick={handleFacebookSingin} className="btn btn-outline-primary mb-4 d-flex align-items-center">
            <img  src={FacebookLogo} alt="" className="bg-white rounded-2" style={{width: "35px", height: "35px"}}/>
            <span className="ms-2">Iniciar sesión con Facebook</span>
          </button>
        </div>
        <form className="border rounded-2 p-3" onSubmit={handleSubmit}>
          {/* <label htmlFor="email" className="form-label">Email</label>      */}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control d-grid col-12 mb-2"  />
          {/* <label htmlFor="password"className="form-label" >Password</label> */}
          <input type="password" name="password" placeholder="Password" id="password" onChange={handleChange} className="form-control" />
          <button className="btn btn-primary d-grid col-12 mx-auto mt-2">Login</button>
        </form>
        { error && <Alert message={error} /> }
      </div>
    </>
  )
}


