import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store/userSlice"; // ✅ Import deleteUser
import { RootState, AppDispatch } from "../store/store";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);
  const [message, setMessage] = useState<string | null>(null); // ✅ State for success message

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, users.length]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(id));
      setMessage("User deleted successfully!"); // ✅ Set success message
      setTimeout(() => setMessage(null), 3000); // ✅ Remove message after 3 seconds
    }
  };

  return (
    <div className="user-list">
      <h1>User List</h1>
      {message && <p className="success-message">{message}</p>} {/* ✅ Success message */}
      <Link to="/add-user">Add User</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.id}>
            <UserCard user={user} />
            <div className="button-group">
              <Link to={`/edit-user/${user.id}`}>
                <button className="edit">Edit</button>
              </Link>
              <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
