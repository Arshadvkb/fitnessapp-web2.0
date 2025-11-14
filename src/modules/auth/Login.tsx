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
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#154d71" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl shadow-2xl p-8"
          style={{ backgroundColor: "#33a1e0" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/80">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                style={{ backgroundColor: "#1c6ea4", color: "white" }}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                style={{ backgroundColor: "#1c6ea4", color: "white" }}
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Select Role
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    role === "user"
                      ? "ring-2 ring-white shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor:
                      role === "user" ? "#1c6ea4" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "user"}
                    className="w-4 h-4 accent-white"
                  />
                  <span className="text-white font-medium">User</span>
                </label>

                <label
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    role === "trainer"
                      ? "ring-2 ring-white shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor:
                      role === "trainer" ? "#1c6ea4" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value="trainer"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "trainer"}
                    className="w-4 h-4 accent-white"
                  />
                  <span className="text-white font-medium">Trainer</span>
                </label>

                <label
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    role === "admin"
                      ? "ring-2 ring-white shadow-lg"
                      : "hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor:
                      role === "admin" ? "#1c6ea4" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={(e) => setRole(e.target.value)}
                    checked={role === "admin"}
                    className="w-4 h-4 accent-white"
                  />
                  <span className="text-white font-medium">Admin</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#1c6ea4" }}
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-white/90">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold underline hover:no-underline transition-all"
                style={{ color: "#fff9af" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white/60 text-sm mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
