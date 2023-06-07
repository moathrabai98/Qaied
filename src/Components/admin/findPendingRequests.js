import React, { useEffect, useState } from 'react';
import { getPendingRequest } from '../../API calls/admin'; // Import the getPendingRequest function

const FindPendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPendingRequest(); // Call the getPendingRequest function
        setPendingRequests(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-md-9 col-sm-12" dir="rtl">
      <h3>الطلبات المعلقة</h3>
      {Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
              <th>المرسل</th>
              <th>المستقبل</th>
              <th>ID</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request , index) => (
                <tr key={index}>
                <td>{index + 1}.</td>
                <td>{request.senderName}</td>
                <td>{request.recieverName}</td>
                <td>{request.productId}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>لا توجد طلبات معلقة</p>
      )}
    </div>
  );
};

export default FindPendingRequests;
