import React, { useState } from "react";
import "./Auth.css";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        toast.success("Successfull");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const provider = new GoogleAuthProvider();

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("SuccessFull Login");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <section className="container main-auth">
        <div className="image">
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <div className="form-auth">
          <h2>Login</h2>
          <form onSubmit={loginUser} className="form-i">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">Login</button>
            <Link to="/reset">Forgot Password</Link>
            <p> -- or -- </p>
          </form>
          <button onClick={signInGoogle}>
            <FaGoogle color="#fff" />
            Login With Google
          </button>
          <div className="register">
            <p>Don't Have An Account? </p>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </section>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Login;
