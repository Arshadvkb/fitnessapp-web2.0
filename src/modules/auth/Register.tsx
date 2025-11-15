import { useState } from "react";
import {
  Upload,
  User,
  Mail,
  Lock,
  MapPin,
  Calendar,
  Activity,
  Target,
  Phone,
} from "lucide-react";
import { authStore } from "../../store/authStore";
import type { FormData } from "../../types/formdata";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const signups = () => toast("signedup successffuly");
  const signupf = () => toast("sign up failed");
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    place: "",
    dob: "",
    height: "",
    weight: "",
    goal: "",
    description: "",
    gender: "",
    file: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const { signup } = authStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({ ...prev, file: file || null }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Create a new Browser FormData instance
    const formDataToSend = new FormData();

    // 2. Loop through your state and append fields
    Object.entries(formData).forEach(([key, value]) => {
      // Handle the file specifically
      if (key === "file") {
        if (value instanceof File) {
          formDataToSend.append("file", value);
        }
      }
      // Handle all other fields (strings)
      else if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(key, value as string);
      }
    });

    // 3. Send the formDataToSend (NOT the formData state)
    const data = await signup(formDataToSend); // <--- Pass the new object here

    if (data) {
      signups();
    } else {
      signupf();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-main py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-accent rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              Join Our Fitness Community
            </h1>
            <p className="text-white/80 text-lg">
              Start your journey to a healthier you
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Profile Picture Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2.5 shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-secondary" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter your name"
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter your number"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      name="place"
                      placeholder="Your city"
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-secondary text-white pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl text-center transition-all border-2 peer-checked:border-white peer-checked:shadow-lg peer-checked:scale-105 ${
                        formData.gender === "male"
                          ? "bg-secondary border-white"
                          : "bg-transparent border-white/30"
                      }`}
                    >
                      <span className="font-semibold text-white">Male</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl text-center transition-all border-2 peer-checked:border-white peer-checked:shadow-lg peer-checked:scale-105 ${
                        formData.gender === "female"
                          ? "bg-secondary border-white"
                          : "bg-transparent border-white/30"
                      }`}
                    >
                      <span className="font-semibold text-white">Female</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      name="height"
                      placeholder="170"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      name="weight"
                      placeholder="70"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Fitness Goal
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    name="goal"
                    placeholder="e.g., Weight Loss, Muscle Gain, Stay Healthy"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-secondary text-white placeholder-white/50 pl-11 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  About Yourself
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us more about yourself and your fitness journey..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-secondary text-white placeholder-white/50 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-lg">
                Start Your Journey
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-white/90">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-light font-semibold underline hover:no-underline transition-all"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white/60 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
