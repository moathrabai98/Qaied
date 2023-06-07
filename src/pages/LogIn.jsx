import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../API calls/user";
import Error from "./Error";
import qaid from '../Components/images/qaied.jpg';
const clearLocalMemory = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
};

const saveToLocalMemory = data => {
  localStorage.setItem("user_id", data._id);
  localStorage.setItem("username", data.username);
  localStorage.setItem("token", data.token);
  localStorage.setItem("userType", data.userType);
};

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  clearLocalMemory();

  const submitForm = async e => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    login(data)
      .then(response => {
        saveToLocalMemory(response.data.data);
        response.data.data.userType === "moderator"
          ? (window.location = "/moderator_home")
          : (window.location = "/home");
      })
      .catch(err => {
        if (err.response.status === 401)
          alert("قمت بإدخال كلمة مرور خاطئة");
        else if (err.response.status === 404)
          alert("اسم المستخدم غير موجود");
        else setError(true);
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
            اكتشف عالم التبادل و التوفير لتعزيز الاقتصاد المستدام، شارك في حماية البيئة و احصل على كل ما تحتاجة بدون نقود ، 
            <strong > قم بتسجيل الدخول الان</strong>
            </p>

            <div className="card">
              <div className="card-body" >
                <form onSubmit={submitForm} dir="rtl">
                  <div className="row">
                    <div className="form-group ">
                      <label className="form-label">
                        <strong >اسم المستخدم</strong>
                      </label>
                      <input
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        dir="rtl"
  
                        className="form-control"
                        placeholder="قم بإدخال اسم المستخدم"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>كلمة المرور</strong>
                      </label>
                      <input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        dir="rtl"
                        className="form-control"
                        placeholder="قم بإدخال كلمة المرور"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary submitbutton  "
                        disabled={
                          username === "" || password === "" ? true : false
                        }
                      > الدخول</button>
                    </div>

                    <p className="mt-5">
                      ليس لدي حساب
                      <Link to="/signup"> أنشئ حساب </Link>
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

export default LogIn;
