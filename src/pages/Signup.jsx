import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import OpenedEye from "../Components/UI/EyeClosed";
import ClosedEye from "../Components/UI/EyeOpened";
import qaid from '../Components/images/qaied.jpg';
import { register } from "../API calls/user";
import Error from "./Error";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [error, setError] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const toggleEyeButton = (elementToChange) => {
    if (elementToChange === "password") {
      passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password");
    } else {
      confirmPasswordType === "password"
        ? setConfirmPasswordType("text")
        : setConfirmPasswordType("password");
    }
  };

  const emailValidator = (email) => {
    return validator.isEmail(email);
  };

  const passwordFormatValidator = (password) => {
    const criteria = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 0,
    };
    if (validator.isStrongPassword(password, criteria)) {
      return true;
    } else {
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      address: address,
      phone: phone,
    };

    register(data)
      .then(() => (window.location = "/login"))
      .catch((err) => {
        if (
          err.response.status === 406 &&
          err.response.data.error.code === "3"
        ) {
          alert(err.response.data.error.message);
        } else if (
          err.response.status === 406 &&
          err.response.data.error.code === "1"
        ) {
          alert(
            "The following username is already taken or an user already exists with the following email address."
          );
        } else if (err.response.status === 500) {
          setError(true);
        }
      });
  };

  return (
    <div className="container-fluid ">
      {error && (
        <Error
          title="Internal Server Error"
          message="We are sorry for Inconvenience. You can try reloading the page."
        />
      )}
      {!error && (
        <div className="row ">
        <section
        className="col-lg-6 d-none d-sm-none d-md-none d-lg-block"
        style={{ backgroundColor: "#dcd7db", height: "110vh" }}
      >
        <img
          src={qaid}
          className="img-fluid rounded-start "
          alt="..."
        />
      </section>
          <div className="col-12 col-lg-6 mt-5 ">
            <h1 dir="rtl">مرحبا بك في قايض</h1>
            <p dir="rtl">
              <strong> قم بإنشاء حساب</strong>
            </p>

            <div className="card">
              <div className="card-body" dir="rtl">
                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="form-group ">
                      <label className="form-label">
                        <strong>اسم المستخدم</strong>
                      </label>
                      <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="قم بإدخال اسم المستخدم"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>البريد الالكتروني</strong>
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        className="form-control"
                        placeholder="قم بإدخال البريد الالكتروني الخاص بك"
                      />
                    </div>
                    {email !== "" && !emailValidator(email) && (
                      <div className="" style={{ color: "red" }}>
                        الرجاء ادخال بريد الكتروني صحيح
                      </div>
                    )}
                  </div>
                  <div className="form-group mt-3">
                    <label className="form-label">
                      <strong>العنوان</strong>
                    </label>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="قم بإدخال عنوانك"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-label">
                      <strong>رقم الهاتف</strong>
                    </label>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="قم بإدخال رقم الهاتف"
                    />
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>كلمة المرور</strong>
                      </label>

                      {passwordType === "password" && (
                        <OpenedEye
                          toggleEye={() => toggleEyeButton("password")}
                        />
                      )}
                      {passwordType === "text" && (
                        <ClosedEye
                          toggleEye={() => toggleEyeButton("password")}
                        />
                      )}

                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={passwordType}
                        className="form-control "
                        placeholder="قم بإدخال كلمة المرور"
                      />
                    </div>
                    {password !== "" && !passwordFormatValidator(password) && (
                      <div className="" style={{ color: "red" }}>
                        يجب أن تكون من ثمانية خانات مع وجود حرف كبير ورقم
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>تأكيد كلمة المرور</strong>
                      </label>

                      {confirmPasswordType === "password" && (
                        <OpenedEye
                          toggleEye={() => toggleEyeButton("confirmPassword")}
                        />
                      )}
                      {confirmPasswordType === "text" && (
                        <ClosedEye
                          toggleEye={() => toggleEyeButton("confirmPassword")}
                        />
                      )}

                      <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={confirmPasswordType}
                        className="form-control "
                        placeholder="قم بإعادة كتابة كلمة المرور للتأكيد"
                      />
                    </div>
                    {confirmPassword !== "" && confirmPassword !== password && (
                      <div className="" style={{ color: "red" }}>
                        كلمة السر غير متطابقة
                      </div>
                    )}
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-primary submitbutton  "
                        disabled={
                          username === "" ||
                          !passwordFormatValidator(password) ||
                          !emailValidator(email) ||
                          confirmPassword !== password
                            ? true
                            : false
                        }
                      >
                        التسجيل
                      </button>
                    </div>

                    <p className="mt-5">
                      لدي حساب <Link to="/login">صفحة تسجيل الدخول</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
