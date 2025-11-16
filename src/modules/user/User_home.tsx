import UserFooter from "../../components/user/UserFooter";
import Usernavbar from "../../components/user/Usernavbar";

const User_home = () => {
  return (
    <div>
      <Usernavbar />
      <div className="min-h-screen">
        <h1>User_home</h1>
      </div>
      <UserFooter />
    </div>
  );
};

export default User_home;
