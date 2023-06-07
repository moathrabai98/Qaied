import React, { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };
const AllReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/reports/getAllreportUser",header)
      .then(response => {
        setReports(response.data.data.reports);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDeleteReport = async (_id) => {
    try {
      await axios.get(`http://127.0.0.1:8000/api/reports/remove/${_id}`);
      setReports(reports.filter(report => report._id !== _id));
    } catch (error) {
      console.log(`Error while deleting report ${_id}`, error);
    }
  };

  return (
    <div className="col-md-9 col-sm-12" dir='rtl'>
      <h2 className='m-2'>البلاغات</h2>
      <table className="table table-striped">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">المنتج</th>
            <th scope="col">المرسل</th>
            <th scope="col">الرسالة</th>
            <th scope="col">التاريخ</th>
            <th scope="col">حذف</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reports) && reports.map((report,index) => (
            <tr key={report._id}>
                    <td>{index + 1}.</td>
              <td>{report.message.productId}</td>
              <td>{report.senderName}</td>
              <td>{report.message.cash}</td>
              <td>{new Date(report.date).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteReport(report._id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReports;
