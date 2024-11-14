"use client";

import { useRouter } from "next/navigation"; 

const LandingPage = () => {

  const router = useRouter(); 


  const handleContinue = () => {
  
   
    router.push("/signup"); 
  };


  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black font-josefin">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landing_image.jpg')" }} 
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
        <div className="w-[950px] h-[620px] bg-black bg-opacity-50 rounded-[50px]">
          <div className="relative z-10 text-center text-white p-8">
            <h1 className="text-[50px] mt-[100px] font-bold mb-6 leading-none">WELCOME TO THEMIS AI</h1>
            <p className="text-[40px] mb-10 leading-tight">
              Transcribe your meetings <br />
              <span>Effortlessly with us.</span>
            </p>

          
            <button
              onClick={handleContinue}
              className="px-[100px] py-[15px] bg-white text-black font-semibold text-[25px] rounded-[15px] hover:bg-gray-200 transition duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;