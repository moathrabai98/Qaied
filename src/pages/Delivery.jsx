import { useEffect, useState } from "react";
import { getAllOrders } from "../API calls/orders";
import React from "react";
const Delivery = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(response => setOrders(response.data.data.orders));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>
                    <a href={`/order/fulfill/${item._id}`}>{item._id}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
