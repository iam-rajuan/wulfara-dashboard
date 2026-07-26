import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { Mail, Lock, Eye, EyeOff, Info, ArrowRight, Globe } from "lucide-react";
import brandlogo from "../../../assets/image/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { user } = useSelector((state) => state.auth);
  const [login, { isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    if (isError && error) {
      setLocalError(error.data?.message || "Login failed");
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, isError, error, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setLocalError("");
    try {
      const { token } = await login({ email, password }).unwrap();
      // Temporarily store token so the getMe query or manual fetch works
      localStorage.setItem("token", token);
      
      // We can use a direct fetch here to get user details for the credentials, 
      // since useQuery is a hook and we are inside a callback.
      const response = await fetch("http://localhost:5000/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await response.json();
      
      dispatch(setCredentials({ user: userData.data, token }));
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-6">
      <div className="w-full max-w-[440px] flex flex-col items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <img src={brandlogo} alt="Wulfara Logo" className="h-10 w-auto object-contain" />
          <span className="text-3xl font-bold text-white tracking-wide">WULFARA</span>
        </div>
        {/* The ADMIN PORTAL badge has been removed here as requested */}

        {/* Main Login Card */}
        <div className="bg-white rounded-xl shadow-xl w-full p-8 md:p-10 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Login</h1>
            <p className="text-[14px] text-gray-500 mb-1">Access the WULFARA management dashboard</p>

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

            {localError && <div className="text-red-500 text-sm font-medium">{localError}</div>}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14.5px] py-3 px-4 rounded-md transition-colors shadow-sm disabled:opacity-70"
              >
                {isLoading ? 'Logging in...' : 'Login to Terminal'}
                {!isLoading && <ArrowRight className="w-4 h-4 font-bold" />}
              </button>

              <p className="text-[14px] text-gray-500 text-center mt-6">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-[#D1A635] hover:text-[#C2982B] hover:underline font-bold transition-colors ml-1">
                  Sign up
                </Link>
              </p>
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
