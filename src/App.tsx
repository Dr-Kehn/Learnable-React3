import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect '/' to '/users' */}
        <Route path="/" element={<Navigate to="/users" />} />

        {/* ✅ Users List Page */}
        <Route path="/users" element={<UserList />} />

        {/* ✅ Add User Page (Pass isEdit=false) */}
        <Route path="/add-user" element={<UserForm isEdit={false} />} />

        {/* ✅ Edit User Page (Pass isEdit=true) */}
        <Route path="/edit-user/:id" element={<UserForm isEdit={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
