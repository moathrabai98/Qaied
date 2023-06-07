import { useEffect, useState } from "react";
import { userDetail } from "../API calls/user";
import { Link } from "react-router-dom";
import "../Components/styles/profile.css";

import humanImage from "../Components/images/human.jpg";

const Profile = () => {
  const [phone, setPhone] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    userDetail(localStorage.getItem("username"))
      .then((response) => {
        setUserExists(true);
        if (response.data.data.phone) {
          setPhone(response.data.data.phone);
        }
        if (response.data.data.address) {
          setAddress(response.data.data.address);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="user-card">
        <img src={humanImage} alt="Human Character" className="human-image" />
      </div>

      <div className="user-details-container" dir="rtl">
        <h1 className="h1">صفحة الملف الشخصي</h1>
        {userExists ? (
          <>
            <h2 className="user-details">تفاصيل المستخدم:</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              العنوان: {address}
            </p>
            <p>
              <i className="fas fa-phone"></i>
              رقم الهاتف: {phone}
            </p>
            <Link to="/editprofile" className="edit-profile-link">
              تعديل الملف الشخصي
            </Link>
          </>
        ) : (
          <p>جارٍ تحميل تفاصيل المستخدم...</p>
        )}
      </div>

      <div className="user-products-container" dir="rtl">
        <h2>منتجاتك</h2>
        <p>عرض المنتجات هنا</p>
        <Link to="/:userId/get_products" className="view-products-link">
          عرض جميع المنتجات
        </Link>
      </div>
    </div>
  );
};

export default Profile;
