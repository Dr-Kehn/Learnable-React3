
interface User {
    id: number;
    name: string;
    email: string;
    address: { city: string };
  }
  
const UserCard = ({ user }: { user: User }) => {

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
    </div>
  );
};

export default UserCard;
