import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function Modal(props) {
  const { modal, toggleModal, setShowIconUser } = props;
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const navigate = useNavigate();
  // đăng ký
  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const [inputSigup, setInputSignup] = useState({});
  const onChangeInputSignUp = (e) => {
    const { name, value } = e.target;
    setInputSignup({ ...inputSigup, [name]: value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    let checkUser = false;
    if (localStorage.getItem("users")) {
      checkUser = users.some(item => item.email === inputSigup.email)
    }
    if (!checkUser) {
      users.push(inputSigup);
      localStorage.setItem("users", JSON.stringify(users));
      setInputSignup({});
      toast.success("Registered successfully");
      console.log("object");
    }
    else {
      toast.error("Email already exists")
    };
  }
  // đăng nhập
  const handleLogin = () => {
    const email = document.getElementById('emailLogin');
    const password = document.getElementById('passwordLogin');
    const isCheckUser = users.some(
      (item) => item.email === email.value
    );
    const user = users.find((item) => item.email === email.value);
    if (
      !isCheckUser ||
      password.value !== user.password
    ) {
      toast.error("Login failed");
      return;
    }
    if (password.value === user.password) {
      setShowIconUser(true);
      toast.success("Logged in successfully");
      toggleModal();
      navigate("/");
      localStorage.setItem("userLogin", JSON.stringify(user));
    }
  }
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="main-login">
              <input type="checkbox" id="chk" aria-hidden="true" />
              <div className="signup">
                <form name="frm-signup">
                  <label className="label-signin" htmlFor="chk" aria-hidden="true"
                  >Sign up</label
                  >
                  <input
                    onChange={onChangeInputSignUp}
                    className="input-login"
                    type="text"
                    name="username"
                    placeholder="User name"
                    required
                    value={inputSigup.username || ""}
                  />
                  <input
                    id="emailSingUp"
                    onChange={onChangeInputSignUp}
                    className="input-login"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={inputSigup.email || ""}
                  />
                  <input
                    onChange={onChangeInputSignUp}
                    className="input-login"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={inputSigup.password || ""}
                  />
                  <button onClick={handleSignUp} className="btn-login">Sign up</button>
                </form>
              </div>
              <div className="login">

                <label className="label-signin" htmlFor="chk" aria-hidden="true"
                >Login</label
                >
                <input
                  id="emailLogin"
                  className="input-login"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  id="passwordLogin"
                  className="input-login"
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required
                />
                <button onClick={handleLogin} className="btn-login">Login</button>

              </div>
            </div>
            <span className="close-modal" onClick={toggleModal}>
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>
        </div>
      )}
    </>
  );
}