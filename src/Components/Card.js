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
    requestsLength,
    description,
    type,
    categoryId,
    onRemove,
  } = props;
console.log(image);
  return (
    <React.Fragment>
      <div className="row mb-2" dir="rtl">
        <div key={_id} className="card">
          <div className="row">
            <div className=" col-md-3 mt-3 mb-3">
              <img
                src={image}
                className="img-fluid rounded-start "
                onClick={() => props.history.push(`/products/${_id}`)}
                alt="..."
                style={{
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
                      <strong
                        className=""
                        style={{ color: statusColor(status) }}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </strong>
                    </small>
                  </div>
                </div>

                <div className="row mt-5">
                  {type === "exchange" && status === "active" && (
                    <button
                      type="button"
                      className=" col-lg-2 col-md-3 col-3 ms-1 btn btn-warning position-relative "
                      onClick={() =>
                        props.history.push({
                          pathname: `/requests/${_id}`,
                          state: { name, description, image },
                        })
                      }
                    >
                      طلبات
                      {requestsLength !== 0 ? (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {requestsLength}
                        </span>
                      ) : (
                        ""
                      )}
                    </button>
                  )}

                  <Button
                    className="col-lg-2 col-md-2 col-3 ms-1"
                    onClick={() => props.history.push(`/products/${_id}`)}
                    variant="success"
                  >
                    عرض
                  </Button>
                  {status !== "sold" && (
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: `/products/update_product`,
                          state: {
                            _id: _id,
                            name: name,
                            imageLink: image,
                            description: description,
                            type: type,
                            categoryid: categoryId,
                          },
                        });
                      }}
                      variant="primary"
                      className="col-lg-2 col-md-2 col-2 ms-1"
                    >
                      تعديل
                    </Button>
                  )}

                  <Button
                    onClick={() => onRemove(_id, name)}
                    variant="danger"
                    className="col-lg-2 col-md-3 col-3 ms-1"
                  >
                    إزالة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Card);
