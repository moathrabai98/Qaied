import { useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { fetchMyProducts } from "../../API calls/products";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { fetchCategories } from "../../API calls/categories";
import { GetAllProductRandomly } from "../../API calls/user"; 
import { BiHeart } from "react-icons/bi";
import '../styles/normalnav.css';
const NormalNav = (props, { history }) => {
  const [requestCount, setRequestCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
const [suggestedProducts, setSuggestedProducts] = useState([]);
const [showSuggestedProducts, setShowSuggestedProducts] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response.data.data.categories);
      })
      .catch((err) =>
        err.response.status === 500 ? setError(true) : setError(false)
      );
  }, []);
  const handleCategoryClick = (categoryId) => {
    props.history.push(`/categories/${categoryId}`);
  };
  const handleProductClick = (productId) => {
    setSearchQuery(""); // Reset the search query
    setShowSuggestedProducts(false);
    props.history.push(`/products/${productId}`);
  };
  useEffect(() => {
    // Fetch the products and check if there are any requests for them
    fetchMyProducts(props.userId, 1, "all")
      .then((response) => {
        let count = 0;
        response.data.data.paginatedProducts.forEach((product) => {
          if (product.requests.length > 0) {
            count++;
          }
        });
        if (count === 0) {
          setRequestCount(0);
        } else {
          setRequestCount(count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.userId]);
  const searchProducts = (query) => {
    setSearchQuery(query);
  
    if (query.length > 0) {
      GetAllProductRandomly(query)
        .then((response) => {
          const filteredProducts = response.data.data.products.filter(
            (product) =>
              product.productName.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestedProducts(filteredProducts);
          setShowSuggestedProducts(true); // Show the suggested products
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSuggestedProducts([]);
      setShowSuggestedProducts(false); // Hide the suggested products
    }
  };
  
  
  
  return (
    <>
      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbar" dir="rtl">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Home">
              الصفحة الرئيسية
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to={`/${props.userId}/get_products`}
            >
              منتجاتي
              {requestCount > 0 && (
                <span className="badge bg-danger">{requestCount}</span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to={`/requests/sent/${props.userId}`}
            >
              طلبات المقايضة
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
        </ul>
        
        <div className="search-categories-container">
        <div className="input-group mr-2">
        <input
        type="text"
        className="form-control form-control-sm"
        placeholder="ابحث عن منتج"
        aria-label="Search"
        aria-describedby="search-bar"
        value={searchQuery}
        onChange={(e) => searchProducts(e.target.value)}
      />
      {showSuggestedProducts && (
        <div className="dropdown dropproduct">
      {suggestedProducts.map((product) => (
        <div
        className="dropdown-row dropproductRow"
          key={product._id}
          onClick={() => handleProductClick(product._id)}
          style={{ color: "#333" ,cursor:"pointer"}}
        >
          {product.productName}
        </div>
      ))}
      </div>
  )}
      

        </div>
        </div>
        <NavDropdown
          title="جميع التصنيفات"
          id="basic-nav-dropdown"
          className="navbar-nav"
        >
          {categories.map((category) => (
            <NavDropdown.Item
              key={category._id}
                        onClick={() => handleCategoryClick(category._id)}

              style={{ color: "#333" }}
            >
              {category.categoryName}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <span className="navbar-text d-md-block  ms-2 me-auto">
            {localStorage.getItem("username")}
            <FaUser size={20} />
        </span>

        <button
  className="btn btn-dark me-2 btn-outline-light"
  style={{ backgroundColor: "#2f4867", border: "none" }}
  onClick={() => {
    props.history.push("/favorite");
  }}
>
 <BiHeart size={20} />
  
</button>

        <NavDropdown
          id="nav-dropdown-dark-example"
          title="المزيد"
          style={{
            fontSize: "100%",
            margin: "7px",
            color: "#fff",
            backgroundColor: "#2f4867",
          }}
          menuVariant="dark"
        >
        <NavLink className="dropdown-item" to="/editprofile">
        تعديل معلوماتي
      </NavLink>
          <NavDropdown.Item href="#action/3.2" onClick={props.userAccess}>
            تسجيل خروج
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );
};

export default withRouter(NormalNav);

