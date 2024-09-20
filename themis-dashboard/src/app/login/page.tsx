"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userLogin } from "../utils/userLogin";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';



// Define validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success message
  const [passwordVisible, setPasswordVisible] = useState(false);  // State for password visibility
 

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await userLogin(data);
      if (response.error) {
        setApiError(response.error); // Set API error message
      } else {
        setSuccessMessage("Login successful! Redirecting to your dashboard..."); 
        setTimeout(() => router.push("/components/posts"), 1500); 
      }
    } catch (error) {
      setApiError((error as Error).message);
    }
  };


  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-josefin">
      <div className="flex w-full h-screen">
      
        <div className="hidden md:flex md:w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/judge.avif')" }}></div>

        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12">
          <h2 className="text-[30px] font-semibold mb-8 text-center text-black">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-black font-medium mb-1 text-sm">Email:</label>
              <input
                id="email"
                type="text"
                placeholder="Enter email"
                {...register("email")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-black font-medium mb-1 text-sm">Password:</label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}  
                placeholder="Enter password"
                {...register("password")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              <button
  type="button"
  onClick={togglePasswordVisibility}
  className="absolute inset-y-1 right-4 flex items-center text-sm leading-5"
>
  {passwordVisible ? (
    <FiEye size={24} className="text-gray-600 relative inset-y-3" />
  ) : (
    <FiEyeOff size={24} className="text-gray-600 relative inset-y-3" />
  )}
</button>

            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full bg-[#083317] text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-800 focus:outline-none text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            {successMessage && (
              <p className="mt-2 text-green-500 text-center text-sm">
                {successMessage}
              </p>
            )}

           
            {apiError && <p className="mt-2 text-red-500 text-center text-sm">{apiError}</p>}
          </form>
          <div className="text-center mt-8">
            <p className="text-sm mb-2">or</p>

          <Link href="/api/auth/login">
            <Button color="primary"  className="w-full flex justify-center items-center text-sm mb-3">
            <FcGoogle size={20} className="mr-2" /> {/* Adjust the size as needed */}
              Sign In with Google
            </Button>
          </Link>
          <p>Don&#39;t have an account? <a href="/signup" className="text-green-700 hover:underline">Sign Up</a></p>
            <a href="/api/auth/logout"> Logout</a>
            {/* <div>User : {JSON.stringify(user)}</div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

