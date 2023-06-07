import React, { useEffect, useState } from "react";
import { updateUser, userDetail } from "../API calls/user";
import validator from "validator";
import { deleteUser } from "../API calls/user";
import './styles/editprofile.css';
function Editprofile() {
  const [userExists, setUserExists] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    userDetail(localStorage.getItem("username"))
      .then((response) => {
        setUserExists(true);
        if (response.data.data.username) {
          setUsername(response.data.data.username);
        }
        if (response.data.data.email) {
          setEmail(response.data.data.email);
        }
        if (response.data.data.phone) {
          setPhone(response.data.data.phone);
        }
        if (response.data.data.address) {
          setAddress(response.data.data.address);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      try {
        await deleteUser(localStorage.getItem("user_id"), localStorage.getItem("username"));
        localStorage.clear();
        window.location.href = '/login';
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSaveChanges = () => {
    const updatedUserData = {
      username,
      email,
      phone,
      address,
      password: changePassword ? newPassword : undefined,
      oldPassword: changePassword ? oldPassword : undefined,
    };

    updateUser(updatedUserData)
      .then(() => {
        setDisabled(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row card mt-3" dir="rtl">
      <div className="card-header">معلوماتك الشخصية</div>
      <div className="card-body">
        <h5 className="card-title">تأكد أن معولوماتك صحيحة!</h5>
        <br />
        <form>
          <div className="mb-3">
            <label className="form-label">الاسم</label>
            <input
              type="text"
              className="form-control"
              value={username}
              placeholder={username}
              disabled={disabled}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">البريد الالكتروني</label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder={email}
              disabled={disabled}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">رقم الهاتف</label>
            <input
              type="number"
              className="form-control"
              value={phone}
              placeholder={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              disabled={disabled}
            />
            {(phone === "" ||
              phone.length !== 10 ||
              phone.charAt(0) !== "0") && (
              <div style={{ color: "red" }}>قم بإدخال رقم الهاتف </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">العنوان</label>
            <textarea
              type="text"
              className="form-control"
              value={address}
              placeholder={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={disabled}
            />
            {address === "" && (
              <div style={{ color: "red" }}>قم بإدخال العنوان الخاص بك </div>
            )}
          </div>

          <div className="mb-3 form-check change-password-label" style={{cursor:"pointer"}}>
          <input
              type="checkbox"
              className="form-check-input"
              id="changePasswordCheckbox"
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
              disabled={disabled}
            />
            <label className="form-check-label change-password-label" style={{cursor:"pointer"}}  htmlFor="changePasswordCheckbox">
              تغيير كلمة المرور
            </label>
          </div>

          {changePassword && (
            <>
              <div className="mb-3">
                <label className="form-label">كلمة المرور الحالية</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="قم بإدخال كلمة المرور الحالية"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={disabled}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="قم بإدخال كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={disabled}
                />
              </div>
            </>
          )}
        </form>

        {disabled && (
          <button
            className="col-md-1 btn btn-primary"
            onClick={() => {
              setDisabled(false);
            }}
          >
            التعديل
          </button>
        )}

        {!disabled && (
          <>
            <button
              disabled={phone === "" || address === "" ? true : false}
              className="btn btn-success ms-1"
              onClick={handleSaveChanges}
            >
              حفظ
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setDisabled(true);
                setChangePassword(false);
                setOldPassword("");
                setNewPassword("");
              }}
            >
              إلغاء
            </button>
          </>
        )}
      </div>
      <div className="card-footer">
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          حذف الحساب{" "}
        </button>
      </div>
    </div>
  );
}

export default Editprofile;
