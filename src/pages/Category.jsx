import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../API calls/categories";
import { Pagination } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import Error from "./Error";
import Spinner from "../Components/Spinner";

const Products = ({ history }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [pageId, setPageId] = useState(1);
  const limit = 12;
  let itemsPaginate = [];
  const [pages, setPages] = useState(itemsPaginate);
  const [error, setError] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);

  

  useEffect(() => {
    fetchProducts(categoryId, pageId)
      .then(response => {
        console.log(response.data.data);
        setResponseRecieved(true);
        setProducts(response.data.data.categoryProducts);
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
        setError(true);
        console.log(err);
      });
  }, [categoryId, pageId]);

  return (
    <div className="container" dir="rtl">
      {!error && !responseRecieved && <Spinner text="جاري التحميل" />}
      {error && (
        <Error
          title="Internal Server Error."
          message="We are sorry for Inconvenience. You can try reloading the page."
        />
        
      )}

      {!error && responseRecieved && products.length === 0 && (
        <>
          <div className="row mt-5">
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <h2>
                <strong>لا يوجد منتجات في هذا القسم !</strong>
              </h2>
            </div>
          </div>
          <div className="row ">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => (window.location = "/")}
              >
                الرجوع الى الصفحة الرئيسية
              </button>
            </div>
          </div>
        </>
      )}
      {!error &&
        responseRecieved &&
        products.length !==0 && (
            <div className="row mt-4">
              <h2>المنتجات المتاحة({products.length})</h2>
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  image={`${product.image[0]}`}
                  name={product.productName}
                  transactionType={product.transactionType}
                  onButtonPress={() => history.push(`/products/${product._id}`)}
                />
              ))}

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
            </div>
          )}
    </div>
  );
};

export default withRouter(Products);
