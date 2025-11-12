import { Link } from "react-router-dom";

const Usernavbar = () => {
  return (
    <div>
      <nav className="min-w-screen bg-accent h-9 pt-2 flex justify-between">
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
            <li>view trainer</li>
            <li>logout</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Usernavbar;
