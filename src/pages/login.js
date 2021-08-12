import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LangauageButton from "../components/langauagebutton";
import { auth } from "../config/config";
import { LangContext, UserContext } from "../contexts/cartContext";

const Login = () => {
  const { Lang } = useContext(LangContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const { User } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    history.push("./login");
  }, []);

  return (
    <div className="p-5">
      <form className="form-group container bgtwo pb-5 pt-3  px-4 col-10 col-sm-7 col-md-4 col-lg-3 my-4 rounded  myshadow">
        <LangauageButton />
        <h2 className="text-center txtone mt-3">
          {Lang === "en" ? "LOGIN" : "تسجيل الدخول"}
        </h2>
        <hr />

        <label>{Lang === "en" ? "Email" : "البريد الإلكتروني"}</label>
        <input
          value={Email}
          className="form-control mt-2"
          placeholder={Lang === "en" ? "Your Email" : "ادخل بريدك الإلكتروني"}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
        <div className="text-danger mb-3">{EmailError}</div>
        <label>{Lang === "en" ? "Password" : "كلمة السر"}</label>
        <input
          value={Password}
          type="password"
          className="form-control mt-2 "
          placeholder={Lang === "en" ? "Your Password" : "ادخل كلمة السر"}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
        />
        <div className="text-danger">{PasswordError}</div>
        <div className="text-center">
          <div
            className="btn btn-outline-one col-12 col-md-6 mt-5 btn-md"
            onClick={(e) => {
              e.preventDefault();

              let check = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email);
              if (!Email || !check)
                setEmailError(
                  Lang === "en"
                    ? "Please enter a valid email"
                    : "برجاء إدخال بريد إلكتروني صالح"
                );
              if (Password.length < 8)
                setPasswordError(
                  Lang === "en"
                    ? "password length should be 8 or more"
                    : "كلمة السر يجب أن تتكون من ثمانية أحرف على الأقل"
                );

              if (!check || !Email || Password.length < 8) return;

              auth
                .signInWithEmailAndPassword(Email, Password)
                .then((x) => {
                  setEmail("");
                  setPassword("");
                })
                .catch((err) => {
                  err.message.length == 89
                    ? setEmailError(
                        Lang === "en"
                          ? "email not registered"
                          : "البريد الإلكتروني غير مسجل"
                      )
                    : setPasswordError(
                        Lang === "en" ? "incorrect password" : "كلمة السر خاطئة"
                      );
                });
            }}
          >
            {Lang === "en" ? "LOGIN" : "دخول"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
