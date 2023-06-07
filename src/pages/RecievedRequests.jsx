import { useState, useEffect, Fragment } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import { fetchProductRequests } from '../API calls/requests';
import { useLocation } from 'react-router-dom';
import { performAction } from '../API calls/requests';
import { Button, Table } from 'react-bootstrap';

const RecievedRequests = ({ history }) => {
  const { productId } = useParams();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [acceptedRequestId, setAcceptedRequestId] = useState(null);

  useEffect(() => {
    fetchProductRequests(productId)
      .then((response) => setRequests(response.data.data.requestsOfThisProduct))
      .catch(() => console.log("Error while fetching products"));
  }, [productId]);

  const doAction = (requestId, action) => {
    if (action === "reject") {
      let newRequests = requests.filter((item) => item._id !== requestId);
      setRequests(newRequests);

      performAction(requestId, action)
        .then((response) => {
          if (response.status !== 200) {
            alert('Unable to reject the product');
            setRequests([...newRequests]);
          }
        })
        .catch((err) => {
          alert('caught in exception');
          console.log(err);
          setRequests([...newRequests]);
        });
    } else if (action === "accept") {
      let newRequests = requests.map((item) => ({
        ...item,
        status: item._id === requestId ? "accepted" : "rejected",
      }));
      setRequests(newRequests);
      setAcceptedRequestId(requestId);

      performAction(requestId, action)
        .then((response) => {
          if (response.status !== 200) {
            alert('Unable to accept the product');
            let newRequests = requests.map((item) => ({
              ...item,
              status: item._id === requestId ? "pending" : "rejected",
            }));
            setRequests(newRequests);
            setAcceptedRequestId(null);
          }
        })
        .catch((err) => {
        //   alert('caught in exception');
        //   let newRequests = requests.map((item) => ({
        //     ...item,
        //     status: item._id === requestId ? "pending" : "rejected",
        //   }));
        //   setRequests(newRequests);
        //   setAcceptedRequestId(null);
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <div className="container mt-5 ml-1" dir="rtl">
        <div style={{ color: "gray" }}>
          <h1 style={{ marginBottom: "1.2em" }}>
            الطلبات الخاصة بالمنتج{" "}
            <span style={{ color: "black" }}>{location.state.name}</span>
          </h1>
        </div>
        {requests && requests.length === 0 && (
          <h6 style={{ marginTop: "20px", color: "red" }}>
            لا يوجد طلبات على هذا المنتج
          </h6>
        )}

        {requests && requests.length !== 0 && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>اسم المرسل</th>
                <th>الاجراءات المقترحة</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.senderName}</td>
                  {request.status === "pending" ? (
                    <td>
                      <Button
                        onClick={() =>
                          history.push(`/products/${request.offer.productId}`)
                        }
                        className="requestcardbutton me-1"
                      >
                        عرض المنتج
                      </Button>
                      <Button
                        onClick={() => {
                          doAction(request._id, "accept");
                        }}
                        variant="success"
                        className="requestcardbutton me-1"
                      >
                        قبول
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => doAction(request._id, "reject")}
                        className="requestcardbutton me-1"
                      >
                        رفض
                      </Button>
                    </td>
                  ) : (
                    <td>
                      <b>{request.status}</b>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {acceptedRequestId && (
          <div style={{ marginTop: "20px" }}>
            <p>
              يمكنك التواصل مع الرقم:{" "}
              {requests.find((request) => request._id === acceptedRequestId)
                .communication.cash}{" "}
              لإتمام عملية المقايضة
            </p>
            <Link to="/" className="btn btn-primary">
              الصفحة الرئيسية
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(RecievedRequests);
