import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const { authUser, login } = authStore();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password, role);
  };

  useEffect(() => {
    if (!authUser) return;

    switch (authUser.role) {
      case "admin":
        navigate("/admin/home");
        break;
      case "trainer":
        navigate("/trainer/home");
        break;
      case "user":
      default:
        navigate("/user/home");
        break;
    }
  }, [authUser, navigate]);

  return (
    <div>
      <div className="min-w-screen min-h-screen bg-main flex justify-center items-center ">
        <form onSubmit={submitHandler}>
          <div className="h-90 w-60 bg-accent flex flex-col gap-5 items-center justify-center rounded-2xl">
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
              className="bg-secondary pl-5 rounded-2xl h-10 w-50"
              type="text"
            />
            <input
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              className="bg-secondary pl-5 rounded-2xl h-10 w-50"
              type="password"
            />

            <div className="flex gap-4 items-center">
              <label htmlFor="user" className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  id="user"
                  value="user"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === "user"}
                />
                <span>User</span>
              </label>
              <label htmlFor="trainer" className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  id="trainer"
                  value="trainer"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === "trainer"}
                />
                <span>Trainer</span>
              </label>
              <label htmlFor="admin" className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  id="admin"
                  value="admin"
                  onChange={(e) => setRole(e.target.value)}
                  checked={role === "admin"}
                />
                <span>Admin</span>
              </label>
            </div>
            <button className="bg-secondary rounded-2xl h-10 w-50">
              Login
            </button>
            <p>
              dont have an acoount?{" "}
              <span className="text-blue-600 underline">regiter</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
