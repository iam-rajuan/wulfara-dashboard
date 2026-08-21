import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import brandlogo from "../../../assets/image/logo.png";
import { API_BASE_URL } from "../../../config/urls";


const ForgatePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, isDashboard: true }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }
      
        message.success("Reset instructions sent to your email!");
      navigate("/sign-in");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9fafb]">
      <div className="py-10 md:py-12 mx-2 md:mx-0 px-6 md:px-10 rounded-2xl w-[580px] h-[525px] bg-white border-2 border-[#eef6ff] mt-10">
       <div className="flex justify-center">
         <img className="w-auto h-10 object-contain" src={brandlogo} alt="brandlogo" />
       </div>
        <h1 className="my-2 font-bold">Forgot password</h1>
        <p className="mb-4 text-gray-600 ">
          Enter your admin email address and we will send you a password reset link.
        </p>

        <Form name="forgotPassword" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="py-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </Form.Item>

          <Form.Item>
            <div className="text-center">
              <button
                type="submit"
                className=" bg-[#0A3019] w-full text-white py-3 px-20 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </Form.Item>

          <p className="text-center text-gray-600">
            Remember your password?{" "}
            <button
              type="button"
              className=" hover:underline"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ForgatePassword;
