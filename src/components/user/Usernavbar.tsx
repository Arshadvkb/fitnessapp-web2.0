import { Link } from "react-router-dom";
import { authStore } from "../../store/authStore";

const Usernavbar = () => {
  const { logout } = authStore();
  return (
    <div>
      <nav className="min-w-screen  h-9 pt-2 pr-5 flex justify-between fixed">
        <div>
          <h1 className="pl-2"> GYM</h1>
        </div>
        <div>
          <ul className="flex gap-2 pr-3">
            <li>
              <Link to="/user/home">home</Link>
            </li>
            <li>
              <Link to="/user/viewvideo">view video</Link>
            </li>
            <li>
              <Link to="/user/viewtrainer"> view trainer</Link>
            </li>
            <button onClick={logout}>Logout</button>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Usernavbar;
