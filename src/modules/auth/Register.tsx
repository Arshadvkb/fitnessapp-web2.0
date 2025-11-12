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
import { Link } from "react-router-dom";

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
  });
  const [preview, setPreview] = useState<string | null>(null);
  const { signup } = authStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signup(formData);
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
        <div className="bg-secondary rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Join Our Fitness Community
            </h1>
            <p className="text-gray-600">
              Start your journey to a healthier you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
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
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="w-5 h-5 text-gray-700" />
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
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="userName"
                  placeholder="Full Name"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="place"
                  placeholder="City"
                  value={formData.place}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Date of Birth - Full Width */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex-1 relative cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 transition">
                    <span className="font-medium text-gray-700">Male</span>
                  </div>
                </label>
                <label className="flex-1 relative cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-purple-500 peer-checked:bg-purple-50 transition">
                    <span className="font-medium text-gray-700">Female</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Physical Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Activity className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="height"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Activity className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Goals */}
            <div className="relative">
              <Target className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="goal"
                placeholder="Your Fitness Goal (e.g., Weight Loss, Muscle Gain)"
                value={formData.goal}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Tell us more about yourself and your fitness journey..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-main via-secondary to-accent text-white font-semibold py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Your Journey
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 underline">
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
