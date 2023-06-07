import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fetchCategories } from "../API calls/categories";
import Spinner from "../Components/Spinner";
import HomeCard from "../Components/HomeCard";
import Error from "./Error";
import React from "react";
import { GetAllProductNew, GetAllProductRandomly } from "../API calls/user";
import ProductCard from "../Components/ProductCard";
import cover from "../Components/images/cover.png";
import '.././Components/UI/common.css';
import '.././Components/styles/Home.css';
const Home = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsRandom, setProductsRandom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductsRandom, setFilteredProductsRandom] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response.data.data.categories);
      })
      .catch((err) =>
        err.response.status === 500 ? setError(true) : setError(false)
      );
  }, []);

  useEffect(() => {
    GetAllProductNew()
      .then((response) => {
        setProducts(response.data.data.products);
        setLoading(false);
      })
      .catch((err) =>
        err.response.status === 500 ? setError(true) : setError(false)
      );
  }, []);

  useEffect(() => {
    GetAllProductRandomly()
      .then((response) => {
        setProductsRandom(response.data.data.products);
        setLoading(false);
      })
      .catch((err) =>
        err.response.status === 500 ? setError(true) : setError(false)
      );
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = productsRandom.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProductsRandom(filtered);
    } else {
      setFilteredProductsRandom(productsRandom);
    }
  }, [searchTerm, productsRandom]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (categories.length === 0 && !error) {
    return <Spinner text="جاري التحميل" />;
  } else if (error) {
    return (
      <Error
        title="خطأ في الخادم الداخلي"
        message="يمكنك إعادة تحميل الصفحة ."
      />
    );
  } else {
    return (
      <div className="container d-flex flex-column align-items-center">
        <div className="row mb-4 mt-4 text-center">
          <div className="col-12" dir="rtl">
            <img
              src={cover}
              alt="Logo"
              style={{ width: "58rem", height: "25em" }}
            />
            <h4 style={{ fontSize: "24px", fontWeight: "bold" , marginTop:"3em"}}>
            أقسام المنتجات

            </h4>
          </div>
        </div>
        <div
          id="categorySlider"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {categories &&
              categories.length > 0 &&
              categories
                .reduce((acc, category, index) => {
                  if (index % 3 === 0) {
                    acc.push([]);
                  }
                  acc[acc.length - 1].push(category);
                  return acc;
                }, [])
                .map((group, groupIndex) => (
                  <div
                    className={`carousel-item ${
                      groupIndex === 0 ? "active" : ""
                    }`}
                    key={groupIndex}
                  >
                    <div className="row justify-content-center">
                      {group.map((category) => (
                        <div
                          key={category._id}
                          className="col-lg-3 col-md-4 col-sm-6 mb-4"
                        >
                          <HomeCard
                            _id={category._id}
                            name={category.categoryName}
                            image={category.image}
                            onButtonPress={() => {
                              history.push(`/categories/${category._id}`);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#categorySlider"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </button>
          <button
            className="carousel-control-next m-4"
            type="button"
            data-bs-target="#categorySlider"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </button>
        </div>
 

        <div className="container mb-4 mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <h4>
                <strong>أحدث المنتجات</strong>
              </h4>
            </div>
            <div className="col-12">
              <div
                id="productSlider"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {products &&
                    products.length > 0 &&
                    products
                    .reduce((acc, product, index) => {
                      if (index < 6) {
                        if (index % 3 === 0) {
                          acc.push([]);
                        }
                        acc[acc.length - 1].push(product);
                      }
                      return acc;
                    }, [])
                    
                      .map((group, groupIndex) => (
                        <div
                          className={`carousel-item ${
                            groupIndex === 0 ? "active" : ""
                          }`}
                          key={groupIndex}
                        >
                          <div className="d-flex justify-content-center">
                            {group.map((product) => (
                              <ProductCard
                                key={product._id}
                                image={`http://127.0.0.1:8000/products/${product.image[0]}`}
                                name={product.productName}
                                transactionType={product.transactionType}
                                onButtonPress={() =>
                                  history.push(`/products/${product._id}`)
                                }
                                style={{ transform: "scale(1.4)" }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#productSlider"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </button>
                <button
                  className="carousel-control-next m-4"
                  type="button"
                  data-bs-target="#productSlider"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row mb-4 mt-5">
            <div className="col-12 text-center">
              <h4>
                <strong> المنتجات</strong>
              </h4>
            </div>
          </div>
          <div
            className="row justify-content-center"
            dir="rtl"
            style={{ marginRight: "-15px", marginLeft: "-15px" }}
          >
            {filteredProductsRandom &&
              filteredProductsRandom.length > 0 &&
              filteredProductsRandom.map((product) => (
                <div
                  key={product._id}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <div className="card">
                    <img
                      onClick={() =>
                        history.push(`/products/${product._id}`)
                      }
                      style={{ cursor: "pointer", height: "20%" }}
                      src={`http://127.0.0.1:8000/products/${product.image[0]}`}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <div className="card-body">
                      <h5
                        className="card-title"
                        onClick={() =>
                          history.push(`/products/${product._id}`)
                        }
                        style={{ cursor: "pointer", fontFamily: "'Roboto', sans-serif" }}
                      >
                        {product.productName}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Home);
