import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../redux/features/auth/authSlice';
import { useRegisterMutation, useVerifyEmailMutation } from '../../../redux/features/auth/authApi';
import { useCreateAdminAssistedSupplierMutation } from '../../../redux/features/listings/listingsApi';
import { Info, Eye, EyeOff, ArrowRight, Search, Mail, Settings, Network, UserPlus, Building2, FileText, Users, Handshake, X } from 'lucide-react';
import { CustomNetworkIcon, CustomSettingsIcon, CustomMailIcon } from "../../../svglogos/SvgIcons";
import { API_BASE_URL, POLICIES_URL } from '../../../config/urls';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    agreedToTerms: false
  });

  const { name, email, password, confirmPassword, companyName, phone, agreedToTerms } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const { user } = useSelector((state) => state.auth);
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [createAdminAssistedSupplier, { isLoading: isCreatingAdminAssisted }] = useCreateAdminAssistedSupplierMutation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const isAdminAssistedMode = searchParams.get('mode') === 'admin_assisted' && user?.role === 'admin';

  useEffect(() => {
    if (isError && error) {
      setLocalError(error.data?.message || 'Registration failed');
    }
    if (user && !isAdminAssistedMode) {
      navigate("/dashboard");
    }
  }, [user, isError, error, navigate, isAdminAssistedMode]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setLocalError('You must agree to the Terms and Supplier Listing Policy');
      return;
    }
    const userData = { name, email, password, companyName, phone, role: 'supplier' };
    
    try {
      if (isAdminAssistedMode) {
        const response = await createAdminAssistedSupplier({ name, email, password, companyName, phone }).unwrap();
        const supplierId = response?.data?.supplier?._id;
        navigate(`/choose-industry?mode=admin_assisted&supplierId=${supplierId}`);
        return;
      }

      await register(userData).unwrap();
      setShowOtpModal(true);
    } catch (err) {
      setLocalError(err.data?.message || 'Registration failed');
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      setLocalError("Please enter the verification code");
      return;
    }
    try {
      const { token } = await verifyEmail({ email, verifyCode: otpCode }).unwrap();
      localStorage.setItem("token", token);
      
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userResponse = await response.json();
      
      dispatch(setCredentials({ user: userResponse.data, token }));
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#F8F9FA] flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-[480px]">
          <h1 className="text-[28px] font-bold text-[#111827] mb-2">Create Supplier Account</h1>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            {isAdminAssistedMode
              ? 'Create the supplier identity, then continue through the exact same onboarding, subscription, and payment workflow.'
              : 'Create a supplier account to add your company profile, receive RFQs, and connect with customers searching for your services.'}
          </p>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
            <form onSubmit={onSubmit} className="space-y-5">

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Business Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 bg-[#FAFBFC] border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <div className="flex items-center gap-1.5 mt-2 text-[12px] text-gray-500">
                  <Info className="w-3.5 h-3.5" />
                  <span>Use your company email for faster verification</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                      placeholder="Create password"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                      required
                      placeholder="Confirm password"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={onChange}
                    required
                    placeholder="Legal company name"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={agreedToTerms}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-[14px] text-gray-600">
                    I agree to the <a href={POLICIES_URL} target="_blank" rel="noopener noreferrer" className="text-[#0052CC] font-medium hover:underline">Terms</a> and <a href={POLICIES_URL} target="_blank" rel="noopener noreferrer" className="text-[#0052CC] font-medium hover:underline">Supplier Listing Policy</a>.
                  </div>
                </label>
              </div>

              {localError && <div className="text-red-500 text-sm font-medium text-center">{localError}</div>}

              <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || isCreatingAdminAssisted}
                    className="w-full flex items-center justify-center gap-2 bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold py-3.5 px-4 rounded-md transition-colors disabled:opacity-70"
                  >
                    {(isLoading || isCreatingAdminAssisted) ? 'Creating Account...' : isAdminAssistedMode ? 'Create & Continue Onboarding' : 'Create Supplier Account'}
                    {!(isLoading || isCreatingAdminAssisted) && <ArrowRight className="w-4 h-4 font-bold" />}
                  </button>
              </div>

              {!isAdminAssistedMode && (
                <div className="text-center pt-2">
                  <p className="text-[14px] text-gray-600">
                    Already have an account? <Link to="/sign-in" className="text-[#0052CC] font-medium hover:underline">Login</Link>
                  </p>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>

      {/* Right Column - Info */}
      <div className="w-full md:w-1/2 bg-[#2B3543] p-6 md:p-12 flex justify-center items-center relative overflow-hidden">
        <div className="w-full max-w-[440px] relative z-10">
          <h2 className="text-[26px] font-bold text-white text-center mb-10">Grow your supplier business online</h2>

          <div className="space-y-4 mb-14">

            {/* Card 1 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <Search className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Get discovered by buyers</h3>
                <p className="text-[13px] text-gray-600">List your capabilities in the global industrial directory.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomMailIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Receive RFQs directly</h3>
                <p className="text-[13px] text-gray-600">Get requests for quotes directly to your inbox.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomSettingsIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Manage your company listing</h3>
                <p className="text-[13px] text-gray-600">Control your public profile and certifications.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg p-4 flex items-start gap-4">
              <div className="bg-[#f8f9ff] p-2 rounded-md shrink-0 mt-0.5">
                <CustomNetworkIcon className="w-5 h-5 text-[#D1A635]" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Grow your business network</h3>
                <p className="text-[13px] text-gray-600">Connect with high-value B2B partners.</p>
              </div>
            </div>

          </div>

          {/* Bottom Progress Steps */}
          <div className="bg-white rounded-xl p-5 flex justify-between items-center relative shadow-sm">

            {/* Connecting lines container */}
            <div className="absolute inset-0 flex items-center px-10 pointer-events-none">
              <div className="w-full flex h-[2px]">
                <div className="w-1/3 border-t-2  border-[#C5C6CD] mt-[-25px]"></div>
                <div className="w-1/3 border-t-2  border-[#C5C6CD] mt-[-25px]"></div>
                <div className="w-1/3 border-t-2 border-dashed border-[#10B981] mt-[-25px]"></div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#1f2937] w-12 h-12 rounded-2xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-extrabold text-[#1f2937]">Account</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#e9f0f8] border border-[#d1d5db] w-12 h-12 rounded-2xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#1f2937]" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-[#4b5563]">Profile</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#e9f0f8] border border-[#d1d5db] w-12 h-12 rounded-2xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#1f2937]" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-[#4b5563]">RFQs</span>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
              <div className="bg-[#d4af37] border-2 border-black w-12 h-12 rounded-2xl flex items-center justify-center">
                <Handshake className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-extrabold text-black">Customers</span>
            </div>

          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {!isAdminAssistedMode && showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#dca12f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#dca12f]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 text-[15px]">
                We've sent a 6-digit verification code to<br/>
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 text-center">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/\D/g, ''));
                    setLocalError('');
                  }}
                  className="w-full text-center text-3xl font-bold tracking-[0.5em] px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-300 focus:outline-none focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20 transition-all"
                  placeholder="------"
                  autoFocus
                />
              </div>

              {localError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium text-center">
                  {localError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || otpCode.length !== 6}
                className="w-full flex items-center justify-center bg-[#1b2b3a] hover:bg-[#111c26] text-white font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify Email & Continue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
