import {useState} from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../images/logo-google.png";
import FacebookLogo from "../images/facebook-logo.png"

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const {signup, loginWithGoogle, loginWithFacebook} = useAuth();
  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await signup(user.email, user.password);
      navigate("/")
    } catch(error) {
      setError(error.message)
      console.log(error.code)
    }
  }

  const handleGoogleSignin = async () => {
    await loginWithGoogle();
     navigate("/")
  }

  const handleFacebookSingin = async () => {
    try {
      await loginWithFacebook();
      navigate("/")
    } catch(error) {
      setError(error)
    }
  }

  return (
    <div className="w-100 d-flex align-items-center flex-column justify-content-center">
      <h2>Register</h2>
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
      <form className="border p-3" onSubmit={handleSubmit}>
          {/* <label htmlFor="email" className="form-label">Email</label>      */}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control d-grid col-12 mb-2"  />
          {/* <label htmlFor="password"className="form-label" >Password</label> */}
          <input type="password" name="password" placeholder="Password" id="password" onChange={handleChange} className="form-control" />
          <button className="btn btn-primary d-grid col-12 mx-auto mt-2">Login</button>
      </form>
      { error && <p>{error}</p> }
      <p><Link to="/login">Logueate</Link> si ya tenés cuenta</p>
    </div>
    // <>
    //   <div className="background"></div>
    //   <div className="card">
    //     {/* <img className="logo" src="logo.svg" /> */}
    //     <h2>Create Account</h2>
    //     <form onSubmit={handleSubmit} className="form">
    //       {/* <input type="text" placeholder="Name" /> */}
    //       <input type="email" placeholder="Email" name="email" onChange={handleChange} />
    //       <input type="password" name="Password" placeholder="Password" id="password" onChange={handleChange} />
    //       <button>SIGN UP</button>
    //     </form>

    //     { error && <p>{error}</p> }

    //     <footer>
    //       Existing users, sign in
    //       <p>here</p>
    //     </footer>
    //   </div>

    // </>
  )
}

