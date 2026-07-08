import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Info, ArrowRight, Globe } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulating login
    setTimeout(() => {
      setLoading(false);
      if (email === "supplier@gmail.com" && password === "123456") {
        localStorage.setItem("user", JSON.stringify({ email, role: "supplier" }));
        navigate("/dashboard");
      } else if (email === "admin@gmail.com" && password === "123456") {
        localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1F2937] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#D1A635] flex items-center justify-center">
             <Globe className="w-6 h-6 text-[#1F2937]" strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-bold text-white tracking-wide">WULFARA</span>
        </div>
        {/* The ADMIN PORTAL badge has been removed here as requested */}

        {/* Main Login Card */}
        <div className="bg-white rounded-xl shadow-xl w-full p-8 md:p-10 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Login</h1>
            <p className="text-[14px] text-gray-500">Access the WULFARA management dashboard</p>
          </div>

          <form onSubmit={onFinish} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="supplier@gmail.com or admin@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-md text-[14px] text-gray-900 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[13px] font-bold text-gray-700">
                  Password
                </label>
                <Link to="/forgate-password" className="text-[12px] font-bold text-gray-900 hover:text-[#D1A635] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F4F5F7] border border-gray-200 rounded-md text-[14px] text-gray-900 focus:outline-none focus:border-[#D1A635] focus:ring-1 focus:ring-[#D1A635] transition-colors"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Device */}
            <div className="flex items-center pt-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-[#D1A635] focus:ring-[#D1A635] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-[13px] text-gray-700 cursor-pointer select-none">
                Remember this device
              </label>
            </div>

            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14.5px] py-3 px-4 rounded-md transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? 'Logging in...' : 'Login to Terminal'}
                {!loading && <ArrowRight className="w-4 h-4 font-bold" />}
              </button>
            </div>
            
          </form>
        </div>

        {/* Security Warning Footer */}
        <div className="w-full border border-slate-600 rounded-lg p-4 flex gap-3 items-start bg-[#1F2937]">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[12px] text-slate-300 leading-relaxed">
            Secure admin access only. Unauthorized access is monitored and restricted by WULFARA Security Systems.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
