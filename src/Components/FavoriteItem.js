import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

const Card = props => {
  const statusColor = status => {
    if (status === "active") {
      return "#198754";
    } else if (status === "rejected") {
      return "#dc3545";
    } else if (status === "pending") {
      return "#0d6efd";
    } else if (status === "sold") {
      return "#fd7e14";
    }
  };
  const {
    _id,
    image,
    name,
    date,
    status,
    onRemove,
    // description,
    // categoryId,
  } = props;

  return (
    <React.Fragment>
      <div key={_id} className="card" style={{ marginTop: "10px" }} dir="rtl">
        <div className="row ">
          <div className="col-md-3 mt-3 mb-3 ">
            <img
              src={image}
              className="img-fluid rounded-start "
              onClick={() => props.history.push(`/products/${_id}`)}
              alt="..."
              style={{
                height: "10em",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="row">
                <h5
                  className="card-title col-md-12"
                  style={{ cursor: "pointer" }}
                  onClick={() => props.history.push(`/products/${_id}`)}
                >
                  <strong>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </strong>
                </h5>
              </div>
              <div className="row">
              </div>

              <div className="row">
                <div className="card-text col-md-12">
                  <small>
                    تاريخ النشر:{" "}
                    {`${new Date(date).getDate() + 1}/${
                      new Date(date).getMonth() + 1
                    }/${new Date(date).getFullYear()}`}
                  </small>
                </div>
              </div>

              <div className="row">
                <div className="card-text col-md-12">
                  <small>
                    <strong className="" style={{ color: statusColor(status) }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </strong>
                  </small>
                </div>
              </div>

              <div className="row mt-4">
                  <Button
                    className="col-2 col-md-2 ms-2 me-2"
                    onClick={() => props.history.push(`/products/${_id}`)}
                    variant="success"
                  >
                    عرض
                  </Button>

                  <Button
                    className="col-2 col-md-2 "
                    onClick={() => onRemove(_id)}
                    variant="danger"
                  >
                    إزالة
                  </Button>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Card);
