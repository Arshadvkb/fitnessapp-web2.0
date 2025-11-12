import { Route, Routes } from "react-router-dom";
import Admin_home from "./modules/admin/Admin_home";
import User_home from "./modules/user/User_home";
import Trainer_home from "./modules/trainer/Trainer_home";
import Login from "./modules/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import View_video from "./modules/user/View_video";

const App = () => {
  return (
    <div>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* admin route */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin_home />
            </ProtectedRoute>
          }
        />

        {/* trainer routes */}
        <Route
          path="/trainer/home"
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <Trainer_home />
            </ProtectedRoute>
          }
        />

        {/* user routes */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <User_home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/viewvideo"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <View_video />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
