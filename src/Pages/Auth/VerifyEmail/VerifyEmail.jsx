import React from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  return (
    <div className="relative min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50 flex items-center justify-center overflow-hidden">
        {/* Decorative large circles to mimic the abstract background */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-white rounded-full opacity-60 mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-white rounded-full opacity-60 mix-blend-overlay blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-white rounded-full opacity-40 mix-blend-overlay blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-[600px] bg-[#2B3543] rounded-2xl p-10 md:p-14 shadow-xl">
        
        {/* Top Progress Tracker */}
        <div className="mb-14 relative w-full px-6">
          {/* Connecting line */}
          <div className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-gray-400 z-0"></div>
          {/* Active line up to step 2 */}
          <div className="absolute top-[18px] left-[15%] right-[50%] h-[2px] bg-white z-0"></div>
          
          <div className="relative z-10 flex justify-between items-start w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#D1A635] border-2 border-white flex items-center justify-center ring-[6px] ring-[#2B3543] z-10">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-[13px] font-bold text-[#D1A635] mt-3 whitespace-nowrap">Create Account</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#D1A635] flex items-center justify-center ring-[6px] ring-[#2B3543] z-10">
                <span className="text-[15px] font-bold text-[#D1A635]">2</span>
              </div>
              <span className="text-[13px] font-bold text-[#D1A635] mt-3 whitespace-nowrap">Verify Email</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center ring-[6px] ring-[#2B3543] z-10">
                <span className="text-[15px] font-bold text-gray-300">3</span>
              </div>
              <span className="text-[13px] font-bold text-white mt-3 whitespace-nowrap">Add Profile</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center px-2">
          
          <div className="bg-white p-4 rounded-xl mb-8">
            <Mail className="w-10 h-10 text-[#D1A635]" strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl font-bold text-white mb-5">Verify your email</h1>
          
          <p className="text-[15px] text-gray-300 mb-10 leading-relaxed max-w-[420px]">
            We sent a verification link to your business email. 
            Please check your inbox and click the link to activate 
            your supplier account.
          </p>

          <div className="w-full space-y-4 mb-10">
            <Link to="/choose-industry" className="block w-full">
              <button className="w-full bg-[#D1A635] hover:bg-[#C2982B] text-gray-900 font-bold py-3.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                Continue After Verification
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </Link>
            <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3.5 px-4 rounded-md transition-colors">
              Resend Email
            </button>
          </div>

          <div className="w-full border-t border-gray-600/50 pt-8">
            <p className="text-[14px] text-gray-300 mb-3">
              Didn't receive the email? Check your spam folder.
            </p>
            <a href="#" className="text-[#D1A635] text-[14px] font-medium underline hover:text-[#C2982B] transition-colors">
              Change Email
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
