"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userSignup } from "@/app/utils/userSignup";
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Define validation schema using Yup
const signupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const formattedData = {
        firstname: data.first_name,
        lastname: data.last_name,
        email: data.email,
        password: data.password,
        role: "judge", 
      };

      const response = await userSignup(formattedData);

      if (response.error) {
        setApiError(response.error);
      } else {
        setSuccessMessage("Account created successfully! Taking you to login..."); 
        setTimeout(() => router.push("/login"), 1500); 
      }
    } catch (error) {
      setApiError((error as Error).message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-josefin">
      <div className="flex w-full h-screen">
        <div
          className="hidden md:flex md:w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/judge.avif')" }}
        ></div>
        <div className="md:w-1/2 h-full flex flex-col justify-center px-12">
          <h2 className="text-[20px] font-semibold text-center text-black">
            Create an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-black font-medium mb-1 text-[20px]"
              >
                Firstname:
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="Enter firstname"
                {...register("first_name")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-black font-medium mb-1 text-[20px]"
              >
                Lastname:
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Enter lastname"
                {...register("last_name")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-black font-medium mb-1 text-[20px]"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-black font-medium mb-1 text-[20px]"
              >
                Password:
              </label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
              <button
  type="button"
  onClick={togglePasswordVisibility}
  className="absolute inset-y-1 right-4 flex items-center text-sm leading-5"
>
  {passwordVisible ? (
    <FiEye size={24} className="text-gray-600 relative inset-y-[18px]" />
  ) : (
    <FiEyeOff size={24} className="text-gray-600 relative inset-y-[18px]" />
  )}
</button>

            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-black font-medium mb-1 text-[20px]"
              >
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-green-500 text-base"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
  type="button"
  onClick={toggleConfirmPasswordVisibility}
  className="absolute inset-y-1 right-4 flex items-center text-sm leading-5"
>
  {confirmPasswordVisible ? (
    <FiEye size={24} className="text-gray-600 relative inset-y-[18px]" />
  ) : (
    <FiEyeOff size={24} className="text-gray-600 relative inset-y-[18px]" />
  )}
</button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full bg-[#083317] text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-800 focus:outline-none text-base ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create an account"}
              </button>
            </div>

          
            {successMessage && (
              <p className="mt-2 text-green-500 text-center text-sm">
                {successMessage}
              </p>
            )}

           
            {apiError && (
              <p className="mt-2 text-red-500 text-center text-sm">
                {apiError}
              </p>
            )}
          </form>
          <div className="text-center mt-2">
            <p className="text-sm ">or</p>
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-green-700 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
