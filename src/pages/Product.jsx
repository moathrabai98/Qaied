import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import {
  fetchProductDetails,
  addToCart,
  removeFromCart,
  fetchAllExchangable,
} from "../API calls/products";
import { sendRequest } from "../API calls/requests";
import Spinner from "../Components/Spinner";
import Error from "./Error";
import { approve, unapprove } from "../API calls/products";
import { Dropdown } from "react-bootstrap";
import { SendReport, userDetail } from "../API calls/user";

const ProductDetails = ({ history }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [chosenProduct, setChosenProduct] = useState("");
  const [chosenProductId, setChosenProductId] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [priceDifference, setPriceDifference] = useState(0);
  const [requestSent, setRequestSent] = useState(false);
  const [requestRecieved, setRequestRecieved] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [pproductId, setProductId] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  
  function handleReportMessageChange(event) {
    setReportMessage(event.target.value);
  }

  const handleSubmitReport = async () => {
    const data = {
      productId,
      senderName: localStorage.getItem("username"),
      message: {
        cash: reportMessage,
        productId,
      },
    };
    await SendReport(data);
    setReportSubmitted(true);
    setReportMessage("");
    setProductId("");
    setSenderName("");
  };

  //moderator deletion of product
  const approveProduct = (async) => {
    const data = { action: "active", productId: product._id };
    approve(data)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while approving product"));
  };

  //moderator deletion of product
  const deleteProduct = (async) => {
    unapprove(product._id)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while unapproving product"));
  };

  //adds to cart
  const add = (productId, navigate) => {
    addToCart(productId)
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          alert("Unable to add product to cart !");
        } else {
          setInCart(true);
          if (navigate) {
            history.push(`/checkout`);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const request = (prodId, exchangeId) => {
    let sender = localStorage.getItem("username");
    let reciever = product.username;
  
    // Retrieve phone number using userDetail function
    userDetail(localStorage.getItem("username"))
      .then((response) => {
        if (response.data.data.phone) {
          const phone = response.data.data.phone;
  
          // Call sendRequest with phone number included in the communication object
          sendRequest(prodId, sender, reciever, priceDifference, exchangeId, phone)
            .then((response) => {
              if (response.status === 200) {
                setRequestSent(true);
                history.push(`/Home`);
              } else {
                alert("Unable to send request");
              }
            })
            .catch();
        } else {
          alert("Phone number not found");
        }
      })
      .catch();
  
  };
  const remove = (productId) => {
    removeFromCart(productId)
      .then((response) => {
        if (response.status !== 200) {
          alert("Unable to remove product from the cart !");
        } else {
          setInCart(false);
        }
      })
      .catch((response) => console.log(response));
  };

  useEffect(() => {
    fetchProductDetails(productId)
      .then((response) => {
        setResponseRecieved(true);
        setProduct(response.data.data.product);
        setInCart(response.data.data.inCart);
        setRequestSent(response.data.data.sentRequest);
        setRequestRecieved(response.data.data.recievedRequest);
      })
      .catch((err) => {
        setResponseRecieved(true);
        if (err.response.status === 406) {
          console.log(err.response.status);
          setError(true);
        }
      });

    if (localStorage.getItem("token")) {
      fetchAllExchangable(localStorage.getItem("user_id"))
        .then((response) => {
          setMyProducts(
            response.data.data.filter(
              (item) =>
                item.transactionType === "exchange" && item.status === "active"
            )
          );
        })
        .catch(() => console.log("Error retrieving User Products from the db"));
    }
  }, [productId, inCart, requestSent]);

  return (
    <div className="container">
      {/* When loading */}
      {!responseRecieved && !error && (
        <Spinner text="جاري تحميل تفاصيل المنتج" />
      )}

      {/* If error */}
      {responseRecieved && error && (
        <Error title="Error while fetching." message="المنتج غير متاح" />
      )}

      {/* If no error */}
      {responseRecieved && !error && (
        <div
          className="row mt-5"
        >
          <img
            className={
              localStorage.getItem("userType") === "normal"
                ? "col-12 col-md-4 mb-3"
                : "col-12 col-md-4 mb-3 "
            }
            src={product.image}
            alt="..."
            style={{ height: "100%" }}
          />
          <div className="col-12 col-md-6 offset-md-1">
            <div className="row" dir={localStorage.getItem("userType") === "moderator" ? "ltr" : "rtl"}>
              <h2 className="col-12">{product.productName}</h2>
            </div>

            {/* If user not logged in */}
            {localStorage.getItem("username") === null && (
              <div className="row">
                <button
                  className="col-5 col-md-6 col-lg-4 ms-3 btn btn-success "
                  onClick={() => history.push("/login")}
                >
                  قم بتسجيل الدخول للإستمرار
                </button>
              </div>
            )}

            <div className="row mt-5" dir={localStorage.getItem("userType") === "moderator" ? "ltr" : "rtl"}>
              <h5>تفاصيل المنتج</h5>
              <p> {product.description}</p>
            </div>

            <div className="row mt-2" dir={localStorage.getItem("userType") === "moderator" ? "ltr" : "rtl"}>
              <h5>مالك المنتج</h5>
              <p dir={localStorage.getItem("userType") === "moderator" ? "ltr" : "rtl"}>
                {" "}
                الاسم: <strong>{product.username}</strong>
              </p>
            </div>
          {/* if user is loggedin/normal/owner/exchange */}
          {product.username === localStorage.getItem("username") &&
          localStorage.getItem("userType") === "normal" &&
          product.transactionType === "exchange" &&
          product.status !== "sold" && (
            <div className="row" dir="rtl">
              <button
                className="col-5 col-md-4 col-lg-3 ms-3 btn btn-warning "
                onClick={() =>
                  history.push({
                    pathname: `/requests/${productId}`,
                    state: {
                      name: product.productName,
                      description: product.description,
                      image: product.image,
                    },
                  })
                }
              >
                طلبات المقايضة
                {product.requests.length !== 0 ? (
                  <span className="badge rounded-pill bg-danger">
                    {product.requests.length}
                  </span>
                ) : (
                  ""
                )}
              </button>
              <button
                className="col-5 col-md-4 col-lg-3 ms-3 btn btn-primary"
                onClick={() => {
                  history.push({
                    pathname: `/products/update_product`,
                    state: {
                      _id: product._id,
                      name: product.productName,
                      imageLink: product.image[0],
                      description: product.description,
                      type: product.transactionType,
                      categoryid: product.categoryId,
                    },
                  });
                }}
                variant="primary"
              >
                تعديل
              </button>
            </div>
          )}
            {/* user loggedIn/normal/not owner/exchange */}
            {!requestRecieved &&
              product.transactionType === "exchange" &&
              localStorage.getItem("userType") === "normal" &&
              product.username !== localStorage.getItem("username") &&
              product.status !== "sold" && (
                <div className="row" dir="rtl">
                {!inCart && product.status === "active" && (
                  <button
                    onClick={() => add(productId, false)}
                    className="col-5 col-md-4 col-lg-5 ms-2 mt-4 btn btn-primary"
                  >
                    الاضافة الى المفضلة
                  </button>
                )}
              
                {inCart && product.status === "active" && (
                  <button
                    onClick={() => remove(productId)}
                    className="col-5 col-md-4 col-lg-5 ms-2 mt-4 btn btn-secondary"
                  >
                    الإزالة من المفضلة
                  </button>
                )}
              
                <div className="col-5 col-md-4 col-lg-5 ms-3 mt-4">
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#reportModal"
                    onClick={() => {
                      setProductId(product._id);
                    }}
                  >
                    الإبلاغ عن المنتج
                  </button>
                </div>

                  <div
                    className="modal fade"
                    id="reportModal"
                    tabIndex="-1"
                    aria-labelledby="reportModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="reportModalLabel">
                            الإبلاغ عن المنتج
                          </h5>
                        </div>
                        <div className="modal-body">
                          <textarea
                            className="form-control"
                            value={reportMessage}
                            onChange={handleReportMessageChange}
                            placeholder="اكتب رسالتك هنا"
                          ></textarea>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              handleSubmitReport();
                              document
                                .getElementById("reportModal")
                                .dispatchEvent(new Event("hidden.bs.modal"));
                            }}
                            data-bs-dismiss="modal"
                          >
                            إرسال
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {reportSubmitted && (
                    <div className="alert alert-success mt-4" role="alert">
                      تم الإبلاغ عن المنتج بنجاح.
                    </div>
                  )}
                  {!requestSent && (
                    <h6>المقايضة على احد المنتجات الخاصة بي : </h6>
                  )}
                  {!requestSent ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-outline-dark"
                      >
                        {chosenProduct}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="col-12">
                        {myProducts.map((item) => (
                          <Dropdown.Item
                            key={item._id}
                            onClick={() => {
                              setChosenProduct(item.productName);
                              setChosenProductId(item._id);
                              setPriceDifference(product.price - item.price);
                            }}
                          >
                            <p className="col-3">{item.productName}</p>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <h6 className="text-danger">
                      لقد قمت بالفعل بإرسال طلب مقايضة على هذا المنتج
                    </h6>
                  )}
                  {!requestSent && (
                    <button
                      className="col-5 col-md-5 col-lg-4 ms-3 mt-3 btn btn-primary "
                      onClick={() => request(productId, chosenProductId)}
                      disabled={
                        chosenProduct === "" || requestSent ? true : false
                      }
                    >
                      {requestSent ? "تم إرسال الطلب" : "إرسال طلب"}
                    </button>
                  )}
                  {requestSent && (
                    <div style={{ marginTop: "10px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          history.push(
                            `/requests/sent/${localStorage.getItem("user_id")}`
                          )
                        }
                      >
                        عرض الطلب{" "}
                      </button>
                    </div>
                  )}
                </div>
              )}

            {/* user loggedIn/moderator */}
            {localStorage.getItem("userType") === "moderator" && (
              <div className="row mt-4 mb-4 ">
                <button
                className="col-4 col-md-4 col-lg-4 ms-4 me-1 btn btn-primary "
                onClick={() =>
                  history.push(`/products/${product._id}/updatePrice`)
                }
              >
                التعديل على المنتج
              </button>
              <button
              className="col-3 col-md-3 col-lg-2 me-1 btn btn-danger "
              onClick={() => deleteProduct(product._id)}
            >
              الرفض
            </button>
                <button
                className="col-2 col-md-3 col-lg-2 me-1 btn btn-success "
                onClick={() => approveProduct(product._id)}
              >
                الموافقة
              </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ProductDetails);
