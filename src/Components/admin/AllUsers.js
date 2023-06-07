import { useState, useEffect } from "react";
import { getAllUser } from "../../API calls/admin";
import { deleteUser } from "../../API calls/user";

const AllUsers = () => {
  const [users, setUsers] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.log("Error while fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
  user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
);
const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(`Error while deleting user ${userId}`, error);
    }
  };

  return (
    <div className="col-md-9 col-sm-12" dir="rtl">
      <h2 className='m-2'>جميع المستخدمين</h2>
      <div className="form-group mt-3">
      <div className="search-bar-container m-2">
      <input
        type="text"
        className="form-control search-bar-input "
        placeholder="ابحث عن مستخدم"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-bar-button">
        <i className="fa fa-search"></i>
      </button>
    </div>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الاسم</th>
            <th scope="col">البريد الإلكتروني</th>
            <th scope="col">رقم الهاتف</th>
            <th scope="col">العنوان</th>
            <th scope="col">حذف</th> {/* New column for delete button */}

          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  حذف
                </button>
              </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">لا يوجد مستخدمين</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
    
  );
};

export default AllUsers;
