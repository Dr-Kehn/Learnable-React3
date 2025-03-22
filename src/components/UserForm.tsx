import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";

interface User {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

const UserForm = ({ isEdit }: { isEdit: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.users.users);
  
  // ✅ Find existing user for editing
  const existingUser = users.find((user) => user.id === Number(id));

  const [formData, setFormData] = useState<User>(
    isEdit && existingUser
      ? existingUser
      : { id: Date.now(), name: "", email: "", address: { city: "" } }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" value={formData.address.city} 
        onChange={(e) => setFormData({ ...formData, address: { city: e.target.value } })} required />
      <button type="submit">{isEdit ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
