import { Route, Routes } from "react-router-dom";
import Admin_home from "./modules/admin/Admin_home";
import User_home from "./modules/user/User_home";
import Trainer_home from "./modules/trainer/Trainer_home";
import Login from "./modules/auth/Login";

const App = () => {
  return (
    <div>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />

        {/* admin route */}
        <Route path="/admin/home" element={<Admin_home />} />

        {/* trainer rotes */}
        <Route path="/trainer/home" element={<Trainer_home />} />

        {/* user routes */}
        <Route path="/user/home" element={<User_home />} />
      </Routes>
    </div>
  );
};

export default App;
