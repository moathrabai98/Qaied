import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import React from "react";
import { Col, Row } from "react-bootstrap";

import { fetchPendingProducts } from "../../API calls/products";

const ModeratorHome = ({ history }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPendingProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch(() => console.log("Error while fetching unapproved products"));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9 col-sm-12" dir="rtl">
          <Row>
            <Col xs={12}>
              <div className="row mt-5">
                <h2>الطلبات المعلقة ({products.length})</h2>
                <hr />
              </div>
              <div className="row mt-4">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">اسم المنتج</th>
                      <th scope="col">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.productName}</td>
                        <td>
                          <a href={`/products/${item._id}`}>عرض</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </div>
        
      </div>
    </div>
  );
};

export default withRouter(ModeratorHome);
