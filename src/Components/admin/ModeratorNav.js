import { Link } from "react-router-dom";
import logo from "../images/logo2.svg"; // Import the logo image

const ModeratorNav = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbar" dir="ltr">
            <button
              className="btn btn-dark btn-outline-light m-1"
              style={{ backgroundColor: "#2f4867" , border:"none" }}
              onClick={props.userAccess}
            >
              تسجيل خروج
            </button>
            <div className="text-center">
              <span className="navbar-text">مرحباً بك، مشرف</span>
            </div>
          </div>
        </nav>

        <div className="col-md-3 col-sm-12 sidebar text-light" style={{ backgroundColor: "#5d7ea2" }}>
        <Link className="navbar-brand" to="/">
        <div className="logo">
        <img src={logo} alt="Logo" className="logo-image mb-2" style={{width:"3em" , height:"2.5em"}}/>
      </div>
          </Link>          
          <ul className="list-unstyled mt-4" >
            <li>
              <Link to="/home" >المنتجات المعلقة</Link>
            </li>
            <li>
              <Link to="/all-users" >المستخدمين</Link>
            </li>
            <li>
              <Link to="/all-products" >المنتجات</Link>
            </li>
            <li>
              <Link to="/FindPendingRequests" >طلبات المقايضة المعلقة</Link>
            </li>
            <li>
              <Link to="/all-reports" >البلاغات</Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModeratorNav;
