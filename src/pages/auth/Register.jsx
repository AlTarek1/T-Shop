import React, { useState } from "react";
import registerImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [loading, setLoading] = useState(false);
  const registerUser = (e) => {
    e.preventDefault();
    if (pass !== cpass) {
      toast.error("Password don't match");
      return;
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("Succesfull");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <section className="container main-auth">
        <div className="form-auth">
          <h2>Register</h2>
          <form onSubmit={registerUser} className="form-i">
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
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
            />
            <button type="submit">Register</button>
            <p> -- or -- </p>
          </form>
          <div className="register">
            <p>Have An Account? </p>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="image">
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Register;
