import React, { useState } from "react";
import forgotImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPass = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Look At Your Email");
        setLoading(false);
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
        <div className="image">
          <img src={forgotImg} alt="Forgot Img" width="400" />
        </div>
        <div className="form-auth">
          <h2>Reset Password</h2>
          <form onSubmit={resetPass} className="form-i">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Reset Password</button>
            <div className="register">
              <Link to="/login">- Login</Link>
              <Link to="/register">- Register</Link>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Reset;
