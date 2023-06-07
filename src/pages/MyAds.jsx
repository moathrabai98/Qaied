      import { useParams, withRouter } from "react-router-dom";
      import { useState, useEffect, Fragment } from "react";
      import { fetchMyProducts, deleteProduct } from "../API calls/products";
      import { Button, Pagination } from "react-bootstrap";
      import Card from "../Components/Card";
      import { RemoveModal } from "../Components/Modal";
      import DropdownSelector from "../Components/UI/Dropdown";
      import Spinner from "../Components/Spinner";
      import Error from "./Error";
      import '../Components/styles/myads.css'
      const MyAds = props => {
        const { userId } = useParams();
        const [modalOpen, setModalOpen] = useState(false);
        const [productIdToBeDeleted, setProductIdToBeDeleted] = useState("");
        const [productNameToBeDeleted, setProductNameToBeDeleted] = useState("");
        const [listedProducts, setListedProducts] = useState([]);
        const [filter, setFilter] = useState("all");
        const [responseRecieved, setResponseRecieved] = useState(false);
        const [error, setError] = useState(false);
        const [errType, setErrType] = useState();
        const [noProducts, setNoProducts] = useState(false);
        const [pageId, setPageId] = useState(1);
        const [pages, setPages] = useState([]);
        
        const [totalProducts, setTotalProducts] = useState(0);
        const limit = 4;

        useEffect(() => {
          fetchMyProducts(userId, pageId, filter)
            .then(response => {
              setResponseRecieved(true);
              setTotalProducts(response.data.data.totalProducts);
              setListedProducts(response.data.data.paginatedProducts);
              let arrpages = [];
              for (
                let number = 1;
                number <= Math.ceil(response.data.data.totalProducts / limit);
                number++
              ) {
                arrpages.push(number);
              }
              setPages(arrpages);
            })
            .catch(err => {
              setResponseRecieved(true);
              if (err.response.status === 404) {
                setNoProducts(true);
              } else if (err.response.status === 500 || err.response.status === 401) {
                setError(true);
                setErrType(err.response.status);
              }
            });
        }, [userId, pageId, filter]);

        const displayModal = (id, name) => {
          setModalOpen(true);
          setProductIdToBeDeleted(id);
          setProductNameToBeDeleted(name);
        };

        const closeModal = () => {
          setModalOpen(false);
          setProductIdToBeDeleted("");
          setProductNameToBeDeleted("");
        };

        const removeProduct = async () => {
          deleteProduct(productIdToBeDeleted)
            .then(() => {
              setProductIdToBeDeleted("");
              window.location.reload(true);
            })
            .catch(() => console.log("Error while deleting product"));
        };

        return (
          <div className="container" dir="rtl">
            {!responseRecieved && !error && <Spinner text="جاري التحميل" />}
            {responseRecieved && noProducts && !error && (
              <>
                <div className="row mt-5">
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "100px" }}
                  >
                    <h2>
                      <strong>لا يجد لديك أي منتجات</strong>
                    </h2>
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-center">
                    <Button
                      onClick={() => props.history.push(`/products/create_new`)}
                      variant="primary"
                      className="btn btn-lg"
                    >
                      اضافة منتج
                    </Button>
                  </div>
                </div>
              </>
            )}
            {responseRecieved && !noProducts && !error && (
              <Fragment>
                {modalOpen && (
                  <RemoveModal
                    close={closeModal}
                    remove={removeProduct}
                    productName={productNameToBeDeleted}
                  />
                )}

                <div className="row">
                  <div className="col-7 col-md-3 col-lg-3 mt-4 mb-5">
                    <Button
                      onClick={() => props.history.push(`/products/create_new`)}
                      variant="primary"
                      className="btn btn-lg"
                    >
                    اضافة منتج
                    </Button>
                  </div>
                </div>
                <div className="row mb-3">
                  <h2 className="col-7 col-md-5"> المنتجات الخاصة بك ({totalProducts})</h2>

                  <DropdownSelector
                    className="col-md-1 col-3 offset-2 offset-md-6"
                    variant="light"
                    label=""
                    labelRequired={false}
                    chosen={filter}
                    options={["all", "active", "rejected", "pending", "sold"]}
                    onSelect={filter => setFilter(filter)}
                    dropdownOff="filter"
                  />
                </div>

                {listedProducts && listedProducts.length > 0 ? (
                  listedProducts
                  // .filter(item => item.requests.length > 0)
                    .map(item => (
                      <Card
                        key={item._id}
                        _id={item._id}
                        image={item.image[0]}
                        name={item.productName}
                        date={item.date}
                        status={item.status}
                        requestsLength={item.requests.length}
                        description={item.description}
                        type={item.transactionType}
                        categoryId={item.categoryId}

                        onRemove={displayModal}
                      />
                    ))
                    .reverse()
                ) : (
                  <></>
                )}
                {pages && pages.length > 1 && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination>
                      {pages.map(number => (
                        <Pagination.Item
                          key={number}
                          onClick={() => setPageId(number)}
                          active={number === pageId}
                        >
                          {number}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                )}
              </Fragment>
            )}
            {responseRecieved && error && (
              <Error
                title={
                  errType === 401 ? "Unauthorized Access" : "Internal Server Error"
                }
                message={
                  errType === 401
                    ? "You are not allowed to access the products."
                    : "We are sorry for Inconvenience. You can try reloading the page."
                }
              />
            )}
          </div>  
        );
      };

      export default withRouter(MyAds);
